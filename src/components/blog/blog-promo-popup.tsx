"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

import { Link, usePathname } from "@/i18n/routing";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";

export function BlogPromoPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setOpen(false);
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setOpen(true);
    }, 5000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [pathname]);

  useEffect(() => {
    let active = true;
    fetch("/assets/Social%20Media%20Marketing/animations/12345.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load animation");
        }
        return response.json();
      })
      .then((json) => {
        if (active) {
          setAnimationData(json as object);
        }
      })
      .catch(() => {
        if (active) {
          setAnimationData(null);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton={false} className="rounded-none sm:max-w-lg sm:rounded-none">
        <div className="overflow-hidden border border-neutral-200 bg-neutral-50">
          {animationData ? (
            <Lottie animationData={animationData} loop autoplay className="h-48 w-full sm:h-56" />
          ) : (
            <div className="h-48 w-full bg-neutral-100 sm:h-56" />
          )}
        </div>
        <DialogHeader>
          <DialogTitle className="text-xl">Read our blogs</DialogTitle>
          <DialogDescription className="mt-1 text-sm text-neutral-600">
            Explore our latest stories, updates, and useful tips from the team.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-3 flex items-center justify-end gap-2">
          <DialogClose asChild>
            <button
              type="button"
              className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md border border-neutral-200 px-4 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
            >
              Maybe later
            </button>
          </DialogClose>
          <DialogClose asChild>
            <Link
              href="/blog"
              className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
            >
              Read blogs
            </Link>
          </DialogClose>
        </div>
      </DialogContent>
    </DialogRoot>
  );
}
