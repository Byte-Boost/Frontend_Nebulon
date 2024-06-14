import { getScoreboard } from "@/scripts/http-requests/InstanceSamples";
import { scoreboardData } from "@/models/models";
import { useEffect, useState } from "react";

const Scoreboard = () => {
  const [topScores, setTopScores] = useState<scoreboardData>({
    top_three: [
      {score: 0, sellersAmount: 0},
      {score: 0, sellersAmount: 0},
      {score: 0, sellersAmount: 0}
    ],
    self: {name: "", score: 0, rank: 0}
  });
  let getData = async () => {
    setTopScores(await getScoreboard())
  }
  useEffect(()=>{
    getData()
  }, [])
  useEffect(()=>{
    console.log(topScores)
  }, [topScores])
  let color = "#eeeeee"
  return (
    <div className="w-full h-full grid gap-3 grid-rows-4 grid-cols-1">
      <p className="bg-[#d4af37]">{topScores.top_three[0].score} Pontos - {topScores.top_three[0].sellersAmount} pessoas aqui</p>
      <p className="bg-[#c0c0c0]">{topScores.top_three[1].score} Pontos - {topScores.top_three[1].sellersAmount} pessoas aqui</p>
      <p className="bg-[#cd7f32]">{topScores.top_three[2].score} Pontos - {topScores.top_three[2].sellersAmount} pessoas aqui</p>
      <p className="bg-[#eeeeee]">{topScores.self.score} - rank: {topScores.self.rank}</p>
    </div>
  );
};

export default Scoreboard; 