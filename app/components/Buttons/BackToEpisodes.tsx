import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

const BackToEpisodes: React.FC = () => {
 return (
  <Link href="/episode">
   <button className="w-[200px] h-[40px] rounded-md border-2 flex flex-row flex-nowrap justify-center py-[6px] mx-auto border-slate-700 text-center mt-6 hover:border-indigo-800 hover:shadow-xl hover:text-indigo-800">
    <IoIosArrowBack className="h-[22px] w-[22px] mr-6" />
    <p className="ml-1">Back To Episodes</p>
   </button>
  </Link>
 );
};

export default BackToEpisodes;
