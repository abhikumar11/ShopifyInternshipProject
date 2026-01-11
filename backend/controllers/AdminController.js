const StoreModel = require("../models/StoreModel");
const OrderModel = require("../models/OrderModel");
const UserModel = require("../models/UserModel");
const ProductModel = require("../models/ProductModel");


const vendorStores = async (req, res) => {
        try {
                const store = await StoreModel.find({});
                res.status(201).json({store: store});

        } catch (err) {
                res.status(500).send({ msg: "Something went wrong",err });
        }
}
const vendorStoreStatus=async(req,res)=>{
        const {ownerId,status}=req.body; 
        try {
           const temp=await StoreModel.findOneAndUpdate({ownerId:ownerId},{status:status})
           if(temp){
                res.status(201).json({msg:"Store status updated"});
           }
           else{
                 res.status(400).json({msg:"Unable to update status"});
           }
        } catch (err) {
                 res.status(500).json({msg:"Something went wrong"});
        }               

}


const getAdminDashboardData = async (req, res) => {
  try {
    const stats = await OrderModel.aggregate([
      {
        $facet: {
          // 1. Calculate Revenue (Only from 'paid' orders) and Total Order Count
          totals: [
            { $match: { paymentStatus: "paid" } },
            {
              $group: {
                _id: null,
                totalRevenue: { $sum: "$totalAmount" },
                count: { $sum: 1 }
              }
            }
          ],
          // 2. Weekly Revenue for the Chart
          revenueTrend: [
            { $match: { paymentStatus: "paid" } },
            {
              $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                amount: { $sum: "$totalAmount" }
              }
            },
            { $sort: { "_id": 1 } },
            { $limit: 7 }
          ],
          // 3. Order Status Distribution (For Fulfillment Chart)
          statusDistribution: [
            { $group: { _id: "$orderStatus", count: { $sum: 1 } } }
          ]
        }
      }
    ]);

    // Independent counts from other collections
    const totalVendors = await UserModel.countDocuments({ role: "vendor" });
    const pendingStores = await StoreModel.countDocuments({ status: "pending" });
    
    const stockStats = await ProductModel.aggregate([
      {
        $group: {
          _id: null,
          totalStock: { $sum: "$stock" },
          lowStockCount: { $sum: { $cond: [{ $lt: ["$stock", 10] }, 1, 0] } }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        revenue: stats[0].totals[0]?.totalRevenue || 0,
        orders: stats[0].totals[0]?.count || 0,
        vendors: totalVendors,
        totalStock: stockStats[0]?.totalStock || 0,
        lowStockAlerts: stockStats[0]?.lowStockCount || 0,
        pendingApprovals: pendingStores,
        chartData: stats[0].revenueTrend,
        fulfillment: stats[0].statusDistribution
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = { vendorStores,vendorStoreStatus,getAdminDashboardData };