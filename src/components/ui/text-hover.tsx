"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

type Word = {
  text: string;
  className?: string;
};

type Props = {
  words?: Word[];
  className?: string;
  cursorClassName?: string;
};

export const TypewriterEffect = ({
  words = [],
  className,
  cursorClassName,
}: Props) => {
  if (!Array.isArray(words)) return null;

  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView && scope.current) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          y: 0,
        },
        {
          duration: 0.4,
          delay: stagger(0.05),
          ease: "easeInOut",
        }
      );
    }
  }, [isInView, scope, animate]);

  return (
    <div
      className={cn(
        "text-center text-neutral-800 dark:text-white font-extrabold tracking-tight leading-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl",
        className
      )}
    >
      <motion.div ref={scope} className="inline-block">
        {wordsArray.map((word, idx) => (
          <div key={`word-${idx}`} className="inline-block">
            {word.text.map((char, index) => (
              <motion.span
                key={`char-${index}`}
                className={cn(
                  "inline-block opacity-0 translate-y-2 transition-transform duration-300",
                  word.className
                )}
              >
                {char}
              </motion.span>
            ))}
            &nbsp;
          </div>
        ))}
      </motion.div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block align-baseline ml-1 rounded w-[5px] h-[2.5rem] sm:h-[3rem] bg-blue-600 dark:bg-blue-400",
          cursorClassName
        )}
      />
    </div>
  );
};


export const TypewriterEffectSmooth = ({
  words = [],
  className,
  cursorClassName,
}: Props) => {
  if (!Array.isArray(words)) return null;

  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  return (
    <div className={cn("flex items-end space-x-1", className)}>
      <motion.div
        className="overflow-hidden"
        initial={{ width: "0%" }}
        whileInView={{ width: "fit-content" }}
        transition={{
          duration: 1.8,
          ease: "easeInOut",
        }}
      >
        <div
          className="font-extrabold text-neutral-900 dark:text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight"
          style={{ whiteSpace: "nowrap" }}
        >
          {wordsArray.map((word, idx) => (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn("inline-block", word.className)}
                >
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          ))}
        </div>
      </motion.div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "block rounded w-[5px] h-[2.5rem] sm:h-[3rem] bg-blue-600 dark:bg-blue-400",
          cursorClassName
        )}
      />
    </div>
  );
};

