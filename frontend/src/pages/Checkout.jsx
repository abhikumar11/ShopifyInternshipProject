import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MapPin, ShieldCheck, CreditCard, Wallet, Truck, Home, Lock, Info } from 'lucide-react';
import { toast } from 'react-toastify';
import { verifyPayment, createRazorpayOrder } from '../redux/actions/CartAction';
import { useNavigate, Link } from 'react-router-dom';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('Online Payment');
  const [isProcessing, setIsProcessing] = useState(false);
  const [useDummy, setUseDummy] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems: cart } = useSelector((state) => state.cart);
  const { user, loading, token } = useSelector((state) => state.userAuth);

  const dummyData = {
    name: "John Doe (Test)",
    address: "123, Nexus Business Park, Phase II",
    city: "Mumbai",
    state: "Maharashtra",
    pin: "400001"
  };

  const activeAddress = (user?.address && !useDummy) ? {
    name: user.name,
    address: user.address,
    city: user.city || "",
    state: user.state || "",
    pin: user.pin || ""
  } : dummyData;

  useEffect(() => {
    if (!loading) {
      if (!token || !user) {
        navigate('/login');
      } else if (cart.length === 0) {
        navigate('/cart');
      }
    }
  }, [loading, token, user, cart.length, navigate]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const netTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalPayable = netTotal;

  const handleCheckout = async () => {

    const customerId = user.userid || user.userid;
    console.log("first",user);
    if (!customerId) {
      toast.error("Session sync error. Please log in again.");
      return;
    }

    setIsProcessing(true);
    try {
      const order = await dispatch(createRazorpayOrder(totalPayable));
      if (!order) {
        setIsProcessing(false);
        return;
      }

      const options = {
        key: "rzp_test_Ruxmmmq53aP7FB", 
        amount: order.amount,
        currency: "INR",
        name: "NEXUS Store",
        description: "Secure Checkout",
        order_id: order.id,
        handler: async (res) => {

          const paymentPayload = {
            razorpay_order_id: res.razorpay_order_id,
            razorpay_payment_id: res.razorpay_payment_id,
            razorpay_signature: res.razorpay_signature,
            orderDetails: {
              customerId: customerId, 

              totalAmount: totalPayable,
              shippingAddress: `${activeAddress.address}, ${activeAddress.city}, ${activeAddress.state} - ${activeAddress.pin}`,
              items: cart.map(item => ({
                productId: item.product || item._id, 

                quantity: item.quantity,
                price: item.price
              }))
            }
          };

          const result = await dispatch(verifyPayment(paymentPayload));
          if (result && result.success) {
            navigate(`/order/success/${result.orderId}`);
          } else {
            toast.error(result?.msg || "Order verification failed.");
            setIsProcessing(false);
          }
        },
        prefill: { name: user?.name, email: user?.email },
        theme: { color: "#14b8a6" },
        modal: { ondismiss: () => setIsProcessing(false) }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Payment initialization failed");
      setIsProcessing(false);
    }
  };

  if (loading) return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      {}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center mb-6 bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-teal-500 text-white' : 'bg-gray-200'}`}>1</div>
            <span className={`text-xs font-bold ${step >= 1 ? 'text-teal-600' : 'text-gray-400'}`}>SHIPPING</span>
          </div>
          <div className="mx-6 h-[1px] w-16 bg-gray-200"></div>
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-teal-500 text-white' : 'bg-gray-200'}`}>2</div>
            <span className={`text-xs font-bold ${step >= 2 ? 'text-teal-600' : 'text-gray-400'}`}>PAYMENT</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-sm font-black text-gray-800 flex items-center gap-2 uppercase">
                  <MapPin size={16} className="text-teal-500" /> 1. Delivery Details
                </h2>
                {user?.address && (
                  <button onClick={() => setUseDummy(!useDummy)} className="text-[10px] font-bold text-teal-600 border border-teal-200 px-2 py-1 rounded bg-teal-50">
                    {useDummy ? "Use My Real Address" : "Use Dummy Address"}
                  </button>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-teal-50 rounded-lg"><Home size={24} className="text-teal-600" /></div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{activeAddress.name}</p>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{activeAddress.address}, {activeAddress.city}, {activeAddress.state} - {activeAddress.pin}</p>
                    {step === 1 && (
                      <button onClick={() => setStep(2)} className="mt-6 bg-teal-500 text-white px-10 py-3 text-xs font-black rounded-md uppercase hover:bg-teal-600 transition-all shadow-md">
                        Confirm & Continue
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className={`bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-300 ${step < 2 ? 'opacity-50 pointer-events-none grayscale' : 'opacity-100'}`}>
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-sm font-black text-gray-800 flex items-center gap-2 uppercase">
                  <CreditCard size={16} className="text-teal-500" /> 2. Payment Method
                </h2>
              </div>
              <div className="p-6">
                <label className="flex items-center gap-4 p-4 border rounded-lg border-teal-500 bg-teal-50">
                  <input type="radio" checked readOnly className="accent-teal-500" />
                  <div className="flex-grow">
                    <p className="text-sm font-bold flex items-center gap-2"><Wallet size={16}/> Online Payment</p>
                    <p className="text-[10px] text-gray-400">Cards, UPI, NetBanking</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6 shadow-md">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest border-b pb-3 mb-4">Pricing Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm"><span>Items ({totalItems})</span><span className="font-bold">₹{netTotal}</span></div>
                <div className="flex justify-between text-sm"><span>Delivery</span><span className="text-teal-600 font-bold">FREE</span></div>
                <div className="pt-4 border-t border-dashed border-gray-200 flex justify-between items-center font-black text-gray-800">
                  <span>AMOUNT PAYABLE</span><span className="text-teal-600 text-2xl">₹{totalPayable}</span>
                </div>
              </div>
              <button onClick={handleCheckout} disabled={step < 2 || isProcessing} className={`w-full mt-8 py-4 rounded-lg font-black text-xs uppercase transition-all shadow-lg ${step === 2 ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-300'}`}>
                {isProcessing ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;