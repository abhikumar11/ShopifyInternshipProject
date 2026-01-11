import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from "../redux/actions/ProductAction"; 
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Zap, ChevronRight } from 'lucide-react';
import ProductGrid from './ProductGrid';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.allProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // CATEGORIZATION LOGIC BASED ON YOUR SCHEMA
  
  // 1. New Arrivals: Sort by latest 'createdAt'
  const newArrivals = products 
    ? [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4) 
    : [];

  // 2. Best Sellers: Filter active products (Simulated logic)
  const bestSellers = products 
    ? products.filter(p => p.status === 'active').slice(0, 4) 
    : [];

  // 3. Deals: (Logic: Products under ₹1000 or specific criteria)
  const deals = products 
    ? products.filter(p => p.price < 1000).slice(0, 4) 
    : [];

  const SectionHeader = ({ title, icon: Icon, link, color = "#008060" }) => (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-white shadow-sm" style={{ color }}>
          <Icon size={24} />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-[#202223]">{title}</h2>
      </div>
      <Link to={link} className="flex items-center gap-1 text-sm font-bold text-[#008060] uppercase tracking-widest hover:opacity-70">
        Explore <ChevronRight size={16} />
      </Link>
    </div>
  );

  return (
    <div className="bg-[#f6f6f7] min-h-screen">
      {/* Hero Section */}
      <section className="bg-white border-b border-[#e1e3e5] mb-12">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center min-h-[500px] p-8 lg:p-0">
          <div className="lg:p-20">
            <h1 className="text-5xl lg:text-7xl font-black text-[#202223] mb-6 leading-tight">
              Quality goods, <br /> <span className="text-[#008060]">Directly to you.</span>
            </h1>
            <Link to="/products" className="inline-flex items-center gap-2 bg-[#008060] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#006e52] transition-all">
              Shop All Products <ArrowRight size={20} />
            </Link>
          </div>
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1500" alt="Hero" className="rounded-3xl lg:rounded-none h-[400px] object-cover" />
        </div>
      </section>

      {/* Product Sections */}
      <main className="max-w-[1440px] mx-auto px-4 md:px-8 space-y-24 pb-20">
        
        <section>
          <SectionHeader title="New Arrivals" icon={Sparkles} link="/products" />
          <ProductGrid products={newArrivals} loading={loading} />
        </section>

        <section className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-[#e1e3e5]">
          <SectionHeader title="Best Sellers" icon={TrendingUp} link="/products" />
          <ProductGrid products={bestSellers} loading={loading} />
        </section>

        {deals.length > 0 && (
          <section>
            <SectionHeader title="Budget Deals" icon={Zap} link="/products" color="#bf0711" />
            <ProductGrid products={deals} loading={loading} />
          </section>
        )}

      </main>
    </div>
  );
};

export default Home;