import GoldMedalIcon from "../scoreboard_icons/gold_medal_icon";
import SilverMedalIcon from "../scoreboard_icons/silver_medal_icon";
import BronzeMedalIcon from "../scoreboard_icons/bronze_medal_icon";
import { formatOrdinal } from "@/scripts/utils/dataFormatter";

interface scoreboardItemProps {
  rank: number;
  score: number;
  people: number;
}
const ScoreboardItem = (props: scoreboardItemProps) => {
  const topColors = ["text-[#d4af37]", "text-[#c0c0c0]", "text-[#cd7f32]", "text-[#333333]"]
  let getMedal = (rank: number) => {
    if (rank === 1) return <GoldMedalIcon className="h-12"/>
    else if (rank === 2) return <SilverMedalIcon className="h-12"/>
    else if (rank === 3) return <BronzeMedalIcon className="h-12"/>
    else return null
  }

  return (
      <div className="sm:rounded-full rounded-2xl flex sm:flex-row flex-col justify-between gap-4 p-4 shadow-md bg-gray-100">
        <div className="h-full rounded-full aspect-square flex justify-center items-center md:scale-75">
          {getMedal(props.rank)}
        </div>
        <div className="h-full grow flex flex-col justify-center items-center">
          <h3 className="text-xl font-bold">{props.score} Pontos</h3>
          <h6 className="text-xs min-[410px]:text-xs min-[1400px]:text-sm ml-4">{props.people} {props.people>1?"pessoas":"pessoa"} aqui</h6>
        </div>
        <div className=" h-full rounded-r-full grow-0 flex justify-center items-center">
          <span className={topColors[props.rank-1]+" p-3 rounded-full font-bold text-2xl"}>{formatOrdinal(props.rank)}</span>
        </div>
      </div> 
  );
};

export default ScoreboardItem; 