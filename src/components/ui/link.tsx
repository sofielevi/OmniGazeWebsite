/**
 * Custom Link component with prefetch disabled by default.
 *
 * This fixes intermittent navigation failures in Next.js App Router
 * caused by prefetch race conditions.
 *
 * @see https://github.com/vercel/next.js/discussions/57565
 */
import NextLink, { LinkProps } from "next/link";
import { forwardRef, AnchorHTMLAttributes } from "react";

type CustomLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps & {
    children?: React.ReactNode;
  };

export const Link = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ prefetch = false, ...props }, ref) => {
    return <NextLink ref={ref} prefetch={prefetch} {...props} />;
  }
);

Link.displayName = "Link";

export default Link;
