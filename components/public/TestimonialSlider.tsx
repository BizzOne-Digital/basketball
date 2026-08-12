"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Quote } from "lucide-react";
import { PLACEHOLDERS, resolveImageAlt, resolveImagePath } from "@/lib/images";
import type { TestimonialDocument } from "@/types";
import "swiper/css";
import "swiper/css/pagination";

interface TestimonialSliderProps {
  testimonials: TestimonialDocument[];
  showAuthorPhoto?: boolean;
}

export function TestimonialSlider({
  testimonials,
  showAuthorPhoto = true,
}: TestimonialSliderProps) {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div className="w-full min-w-0 overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        loop={testimonials.length > 2}
        pagination={{ clickable: true }}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
        }}
        className="testimonial-slider w-full max-w-full overflow-hidden pb-12"
      >
      {testimonials.map((item) => (
        <SwiperSlide key={item.slug} className="!flex !h-auto">
          <article className="flex min-h-[22rem] w-full flex-col rounded-3xl border border-white/10 bg-mountie-blue/20 p-8 md:min-h-[24rem]">
            <Quote className="mb-4 shrink-0 text-ice-blue" size={28} />
            <blockquote className="flex-1 text-base leading-8 text-mountie-white md:text-lg">
              “{item.quote}”
            </blockquote>
            <div className="mt-auto flex items-center gap-4 border-t border-white/10 pt-6">
              {showAuthorPhoto ? (
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/10">
                  <Image
                    src={resolveImagePath(item.authorPhoto, PLACEHOLDERS.team)}
                    alt={resolveImageAlt(item.authorPhoto, item.authorName)}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : null}
              <div>
                <p className="font-display text-base uppercase tracking-[0.08em] text-mountie-white">
                  {item.authorName}
                </p>
                {item.authorRole ? (
                  <p className="text-sm text-mountie-silver">{item.authorRole}</p>
                ) : null}
              </div>
            </div>
          </article>
        </SwiperSlide>
      ))}
      </Swiper>
    </div>
  );
}
