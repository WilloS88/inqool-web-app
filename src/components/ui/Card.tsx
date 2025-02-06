import { motion } from "framer-motion";

type CardProps = {
  children: React.ReactNode;
}

export const Card = ({ children }: CardProps) => {
  return (
    <motion.div
      className="max-w-sm rounded overflow-hidden shadow-xl m-4"
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
};