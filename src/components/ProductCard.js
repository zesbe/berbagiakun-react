import { Card, Button } from "react-bootstrap";
import { useRouter } from "next/router";

export default function ProductCard({ product }) {
  const router = useRouter();

  // Cari harga terendah dari durations, fallback ke base_price
  let hargaTermurah = product.base_price || 0;
  if (product.durations && Array.isArray(product.durations) && product.durations.length > 0) {
    hargaTermurah = Math.min(...product.durations.map(d => d.price));
  }

  return (
    <Card className="shadow-sm mb-4 border-0" style={{ borderRadius: "18px", minHeight: 340 }}>
      <div className="d-flex justify-content-center align-items-center" style={{background:'#f7f8fa',height:120}}>
        <img src={product.image_url} alt={product.name} style={{maxHeight:70, maxWidth:70}} />
      </div>
      <Card.Body>
        <Card.Title className="fw-bold mb-1">{product.name}</Card.Title>
        <Card.Text style={{ fontSize: 15, minHeight: 40 }}>{product.description}</Card.Text>
        <div className="mb-2">
          <span className="badge bg-secondary me-1">{product.category}</span>
          <span className={`badge ${product.type === "auto" ? "bg-success" : "bg-warning"}`}>
            {product.type === "auto" ? "Auto" : "Manual"}
          </span>
        </div>
        <div className="mb-2 fw-bold fs-5 text-primary">Mulai Rp{hargaTermurah.toLocaleString()}</div>
        <Button className="w-100" variant="outline-primary"
          onClick={() => router.push(`/products/${product.slug}`)}>
          Lihat Detail
        </Button>
      </Card.Body>
    </Card>
  );
}
