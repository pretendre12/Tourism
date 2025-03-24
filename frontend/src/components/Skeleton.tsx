import { motion } from "framer-motion";

const Skeleton = () => {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className="w-full h-full bg-gray-300 dark:bg-gray-700 rounded-md"
    />
  );
};

export default Skeleton;
