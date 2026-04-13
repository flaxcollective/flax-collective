"use client";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animation?: "fade-up" | "fade-down" | "fade-in" | "fade-left" | "fade-right" | "scale-in" | "slide-up";
  delay?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;
  duration?: 500 | 700 | 900 | 1100;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Wrap any element to animate it on scroll.
 * Example:
 *   <AnimateOnScroll animation="fade-up" delay={200}>
 *     <MyComponent />
 *   </AnimateOnScroll>
 */
export default function AnimateOnScroll({
  children,
  animation = "fade-up",
  delay,
  duration,
  className = "",
  as: Tag = "div",
}: AnimateOnScrollProps) {
  const classes = [
    "anim",
    animation,
    delay   ? `delay-${delay}`    : "",
    duration ? `duration-${duration}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Tag className={classes}>{children}</Tag>;
}