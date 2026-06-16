export const runtime = 'edge';

type PageProps = { params: Promise<{ slug: string }> };

export default async function CompanyPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#222] mb-2">{slug}</h1>
        <p className="text-[#717171]">Company profile page — coming next</p>
      </div>
    </div>
  );
}
