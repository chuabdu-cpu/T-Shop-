import { useState } from 'react';
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
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="px-4 py-2 border border-gray-300 rounded-lg"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                )}

                {/* Pi Network */}
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-blue-50 transition"
                  style={{ borderColor: paymentMethod === 'pi' ? '#2563eb' : '#e5e7eb' }}>
                  <input
                    type="radio"
                    name="payment"
                    value="pi"
                    checked={paymentMethod === 'pi'}
                    onChange={() => setPaymentMethod('pi')}
                    className="w-4 h-4"
                  />
                  <Wallet size={20} className="ml-3 text-blue-600" />
                  <span className="ml-3 font-semibold">محفظة Pi Network</span>
                </label>

                {paymentMethod === 'pi' && (
                  <div className="ml-8 pb-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-3">
                      سيتم تحويلك إلى تطبيق Pi Network للتأكيد
                    </p>
                    <input
                      type="text"
                      placeholder="معرف محفظة Pi"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                )}

                {/* Digital Wallet */}
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-blue-50 transition"
                  style={{ borderColor: paymentMethod === 'wallet' ? '#2563eb' : '#e5e7eb' }}>
                  <input
                    type="radio"
                    name="payment"
                    value="wallet"
                    checked={paymentMethod === 'wallet'}
                    onChange={() => setPaymentMethod('wallet')}
                    className="w-4 h-4"
                  />
                  <Wallet size={20} className="ml-3 text-blue-600" />
                  <span className="ml-3 font-semibold">محفظة رقمية</span>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
              <h2 className="text-xl font-bold mb-6">ملخص الطلب</h2>

              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">المجموع الفرعي</span>
                  <span className="font-semibold">{formatPiAndUSD(120).pi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الضريبة</span>
                  <span className="font-semibold">{formatPiAndUSD(18).pi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الشحن</span>
                  <span className="font-semibold">{formatPiAndUSD(12).pi}</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold">الإجمالي</span>
                  <span className="text-2xl font-bold text-blue-600">{piTotal}</span>
                </div>
                <p className="text-gray-500 text-sm">{usdTotal}</p>
              </div>

              <Button
                onClick={handlePlaceOrder}
                disabled={isProcessing || !shippingAddress}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold disabled:opacity-50"
              >
                {isProcessing ? 'جاري المعالجة...' : 'تأكيد الطلب'}
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                بالضغط على "تأكيد الطلب" فإنك توافق على شروط الخدمة
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

