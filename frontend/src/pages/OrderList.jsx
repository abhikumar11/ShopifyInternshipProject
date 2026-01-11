import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../redux/actions/OrderActions';
import { ChevronRight, Loader2, Truck, ShoppingBag, X, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderList = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const [showTracker, setShowTracker] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  if (loading) return <div style={{textAlign:'center', padding:'50px'}}><Loader2 className="animate-spin" /> Loading...</div>;

  return (
    <div style={{ backgroundColor: '#f6f6f7', minHeight: '100-screen', padding: '20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontWeight: '900', fontSize: '24px', marginBottom: '20px' }}>Your Orders</h1>

        {(!orders || orders.length === 0) ? (
          <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '20px' }}>
            <ShoppingBag size={48} color="#ccc" />
            <p>No orders found.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {orders.map((order) => (
              <div key={order._id} style={{ background: 'white', borderRadius: '16px', border: '1px solid #e1e3e5', overflow: 'hidden' }}>
                
                {/* Header Section */}
                <div style={{ padding: '15px 20px', background: '#f8f9fa', borderBottom: '1px solid #e1e3e5', display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: '900', color: '#6d7175' }}>DATE</div>
                      <div style={{ fontSize: '12px', fontWeight: '700' }}>{new Date(order.date).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: '900', color: '#6d7175' }}>TOTAL</div>
                      <div style={{ fontSize: '12px', fontWeight: '700', color: '#008060' }}>₹{order.totalAmount}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '10px', fontWeight: '900', color: '#6d7175' }}>STATUS</div>
                    <div style={{ fontSize: '10px', fontWeight: '900', color: '#202223', textTransform: 'uppercase' }}>{order.orderStatus}</div>
                  </div>
                </div>

                {/* Content Section */}
                <div style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                  
                  {/* Items List */}
                  <div style={{ flex: '1', minWidth: '250px' }}>
                    {order.items?.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                        <img src={item.image} alt="" style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #eee' }} />
                        <div>
                          <p style={{ margin: '0', fontSize: '13px', fontWeight: '700' }}>{item.name}</p>
                          <p style={{ margin: '0', fontSize: '11px', color: '#6d7175' }}>Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* BUTTONS SECTION - Forced Visibility */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '180px' }}>
                    
                    <button 
                      onClick={() => { setSelectedOrder(order); setShowTracker(true); }}
                      style={{
                        backgroundColor: 'white',
                        border: '2px solid #202223',
                        color: '#202223',
                        padding: '10px',
                        borderRadius: '10px',
                        fontSize: '11px',
                        fontWeight: '900',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        textTransform: 'uppercase'
                      }}
                    >
                      <Truck size={16} /> Track Order
                    </button>

                    <Link 
                      to={`/order/${order._id}`}
                      style={{
                        backgroundColor: '#202223',
                        color: 'white',
                        padding: '12px',
                        borderRadius: '10px',
                        fontSize: '11px',
                        fontWeight: '900',
                        textDecoration: 'none',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px',
                        textTransform: 'uppercase'
                      }}
                    >
                      View Details <ChevronRight size={14} />
                    </Link>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Basic Tracker Modal */}
      {showTracker && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '24px', width: '100%', maxWidth: '400px', position: 'relative' }}>
            <button onClick={() => setShowTracker(false)} style={{ position: 'absolute', right: '20px', top: '20px', border: 'none', background: 'none', cursor: 'pointer' }}><X /></button>
            <h3 style={{ fontWeight: '900', textTransform: 'uppercase', fontSize: '14px', marginBottom: '20px' }}>Order Status</h3>
            <p style={{ fontSize: '18px', fontWeight: '700', color: '#008060' }}>{selectedOrder.orderStatus}</p>
            <button 
               onClick={() => setShowTracker(false)}
               style={{ marginTop: '20px', width: '100%', padding: '10px', background: '#eee', border: 'none', borderRadius: '10px', fontWeight: '700' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;