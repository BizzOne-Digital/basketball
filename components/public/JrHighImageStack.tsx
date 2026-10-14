import Image from "next/image";

interface JrHighImageStackProps {
  images: string[];
  alt: string;
}

export function JrHighImageStack({ images, alt }: JrHighImageStackProps) {
  if (images.length === 0) {
    return (
      <p className="text-mountie-silver">Content will be added soon.</p>
    );
  }

  return (
    <div className="space-y-6">
      {images.map((src, index) => (
        <div
          key={src}
          className="overflow-hidden rounded-3xl border border-white/10 bg-gunmetal/20"
        >
          <Image
            src={src}
            alt={images.length > 1 ? `${alt} — page ${index + 1}` : alt}
            width={1600}
            height={900}
            priority={index === 0}
            className="h-auto w-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}
