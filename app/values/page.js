import Link from 'next/link';
import Header from '../components/Header';
import { Target, ShieldCheck, Zap, ArrowRight, BookOpen } from 'lucide-react';

export default function ValuesPage() {
  const values = [
    {
      id: 'v1',
      title: 'Nói sao làm vậy',
      subtitle: 'NỀN TẢNG ĐẠO ĐỨC',
      description: 'Sự nhất quán giữa lời nói và hành động là thước đo giá trị cao nhất của con người HGPT. Chúng ta không hứa suông, chúng ta cam kết và thực hiện đúng những gì đã tuyên bố.',
      points: [
        'Trung thực trong mọi giao tiếp.',
        'Giữ đúng cam kết về tiến độ và chất lượng.',
        'Dám nhận lỗi và sửa đổi khi sai sót.'
      ],
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100',
      image: '/v1.png'
    },
    {
      id: 'v2',
      title: 'Giải pháp tối ưu',
      subtitle: 'ĐỘNG LỰC CỦA SỰ PHÁT TRIỂN',
      description: 'Không hài lòng với những gì đang có. Luôn tìm tòi cách làm mới, công nghệ mới để rút ngắn thời gian, giảm chi phí và nâng cao chất lượng sản phẩm thép HGPT.',
      points: [
        'Sáng tạo và cải tiến không ngừng.',
        'Làm việc thông minh, ưu tiên hiệu quả.',
        'Tận dụng sức mạnh của công nghệ và AI.'
      ],
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-100',
      image: '/v2.png'
    },
    {
      id: 'v3',
      title: 'Trách nhiệm đến cùng',
      subtitle: 'XÁC LẬP ĐÍCH ĐẾN THÀNH CÔNG',
      description: 'Làm chủ công việc và chịu trách nhiệm với kết quả cuối cùng. Không đùn đẩy, không bỏ cuộc giữa chừng dù đối mặt với khó khăn hay thách thức khắc nghiệt nhất.',
      points: [
        'Bám đuổi mục tiêu quyết liệt.',
        'Sẵn sàng vì lợi ích chung của tập thể.',
        'Hoàn thành xuất sắc nhiệm vụ được giao.'
      ],
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100',
      image: '/v3.png'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Header />

      <main className="max-w-[1200px] mx-auto px-6 py-20 divide-y divide-slate-100">
        {/* HERO SECTION */}
        <div className="text-center mb-24 space-y-6">
          <div className="flex justify-center mb-4">
            <span className="bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-indigo-100">
              LÝ THUYẾT VĂN HÓA DOANH NGHIỆP
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9]">
            HGPT STEEL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">CORE VALUES</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
            Mô hình hóa hệ giá trị cốt lõi kiến tạo nên sức mạnh và văn hóa bền vững của đại gia đình HGPT Steel.
          </p>
        </div>

        {/* THREE PILLARS MODEL */}
        <section className="py-24 space-y-32">
          {values.map((v, idx) => (
            <div key={v.id} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-24`}>
              {/* IMAGE / VECTOR */}
              <div className="flex-1 w-full max-w-md">
                <div className={`relative aspect-square rounded-[3rem] ${v.bgColor} p-12 overflow-hidden border ${v.borderColor}`}>
                  <img src={v.image} alt={v.title} className="w-full h-full object-contain relative z-10 transition-transform duration-700 hover:scale-105" />
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-[100px]" />
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex-1 space-y-8">
                <div className="space-y-4">
                  <div className={`flex items-center gap-3 ${v.color}`}>
                    <ShieldCheck size={24} />
                    <span className="text-[12px] font-black uppercase tracking-[0.4em]">{v.subtitle}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none uppercase">
                    {v.title}
                  </h2>
                </div>

                <p className="text-slate-600 text-[17px] leading-relaxed font-medium">
                  {v.description}
                </p>

                <ul className="space-y-4">
                  {v.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 group">
                      <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${v.color.replace('text-', 'bg-')} ring-4 ring-white shadow-sm transition-transform group-hover:scale-150`} />
                      <span className="text-slate-700 font-semibold">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* BOTTOM PHILOSOPHY CARD */}
        <section className="py-24">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Target size={200} />
            </div>

            <div className="relative z-10 space-y-8">
              <div className="flex justify-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <BookOpen size={24} className="text-indigo-400" />
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight uppercase">
                "CÙNG NHAU THÀNH CÔNG"
              </h3>
              <p className="text-slate-400 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed border-t border-white/10 pt-8 italic">
                "Khi mỗi quyết định đều lấy khách hàng làm trung tâm, công ty làm nền tảng và cá nhân làm động lực phát triển."
              </p>
              <div className="pt-8">
                <Link href="/">
                  <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-indigo-50 transition-colors flex items-center gap-3 mx-auto">
                    Trang chủ Timeline <ArrowRight size={18} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-[1200px] mx-auto px-10 py-16 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.3em]">HGPT STEEL CULTURE FRAMEWORK v1.0 • 2026</p>
      </footer>
    </div>
  );
}
