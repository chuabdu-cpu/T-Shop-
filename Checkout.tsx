import { CreditCard, Wallet, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPiAndUSD } from '@/lib/piConverter';

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pi' | 'wallet'>('card');
  const [shippingAddress, setShippingAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const orderTotal = 150;
  const { pi: piTotal, usd: usdTotal } = formatPiAndUSD(orderTotal);

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      // Simulate order placement
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert('تم تأكيد الطلب بنجاح!');
    } catch (error) {
      alert('حدث خطأ أثناء معالجة الطلب');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">الدفع والتأكيد</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={24} className="text-blue-600" />
                <h2 className="text-xl font-bold">عنوان التوصيل</h2>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="الاسم الكامل"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="العنوان"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="المدينة"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="الرمز البريدي"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <textarea
                  placeholder="ملاحظات إضافية"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">طريقة الدفع</h2>

              <div className="space-y-3">
                {/* Credit Card */}
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-blue-50 transition"
                  style={{ borderColor: paymentMethod === 'card' ? '#2563eb' : '#e5e7eb' }}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="w-4 h-4"
                  />
                  <CreditCard size={20} className="ml-3 text-blue-600" />
                  <span className="ml-3 font-semibold">بطاقة ائتمان</span>
                </label>

                {paymentMethod === 'card' && (
                  <div className="ml-8 space-y-3 pb-4">
                    <input
                      type="text"
                      placeholder="رقم البطاقة"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
