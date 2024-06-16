import { getScoreboard } from "@/scripts/http-requests/InstanceSamples";
import { scoreboardData } from "@/models/models";
import { useEffect, useState } from "react";
import ScoreboardItem from "../scoreboard_item";
import { formatOrdinal } from "@/scripts/utils/dataFormatter";
import ClientIcon from "../sidebar_icons/client_icon";
import { jwtDecode } from "jwt-decode";
import cookie from "@boiseitguru/cookie-cutter";

const Scoreboard = () => {
  const topColors = ["text-[#d4af37]", "text-[#c0c0c0]", "text-[#cd7f32]", "text-[#333333]"]
  const [topScores, setTopScores] = useState<scoreboardData>({
    top_three: [
      {score: 0, sellersAmount: 0},
      {score: 0, sellersAmount: 0},
      {score: 0, sellersAmount: 0}
    ],
    self: {name: "", score: 0, rank: 0}
  });
  const [currentUser, setCurrentUser] = useState<any>({});

  useEffect(() => {
    async function fetchData(){
      const token = cookie.get('token');
      if (token) {
        const decoded = jwtDecode<any>(token);
        setCurrentUser(decoded);
      }      
    };
    fetchData();
  },[]);

  let getData = async () => {
    setTopScores(await getScoreboard())
  }
  let getRankPeople = (rank: number) => {
    return topScores.top_three[rank-1].sellersAmount
  }
  let getRankScore = (rank: number) => {
    return topScores.top_three[rank-1].score
  }
  useEffect(()=>{
    getData()
  }, [])

  return (
    <div className="w-full h-full grid gap-3 grid-rows-4 grid-cols-1">
      
      {/* Gold */}
      {topScores.top_three.length >= 1 ? 
        <ScoreboardItem rank={1} score={getRankScore(1)} people={getRankPeople(1)}/>
      : null
      }

      {/* Silver */}
      {topScores.top_three.length >= 2 ? 
        <ScoreboardItem rank={2} score={getRankScore(2)} people={getRankPeople(2)}/>
      : null
      }
      
      {/* Bronze */}
      {topScores.top_three.length >= 3 ? 
        <ScoreboardItem rank={3} score={getRankScore(3)} people={getRankPeople(3)}/>
      : null
      }

      {/* User */}
      {/* topScores.self.rank-1 > 2 ? topColors[3] : topColors[topScores.self.rank-1] */}
      
      <div className="flex md:flex-row flex-col  justify-between gap-4 p-4 shadow-md bg-gray-200">
        <div className="h-full rounded-full aspect-square flex justify-center items-center">
          <ClientIcon className="invert"/>
        </div>
        <div className="h-full grow flex md:flex-col justify-center items-center">
          <h3 className="text-xl font-bold">{topScores.self.score} Pontos</h3>
          <h6 className="text-xl font-bold ml-4">{currentUser.username}</h6>
        </div>
        <div className=" h-full rounded-r-full grow-0 flex justify-center items-center">
          <span className={(topScores.self.rank-1 > 2 ? topColors[3] : topColors[topScores.self.rank-1])+" p-3 rounded-full font-bold text-2xl"}>{formatOrdinal(topScores.self.rank)}</span>
        </div>
      </div> 
    
    </div>
  );
};

export default Scoreboard; 