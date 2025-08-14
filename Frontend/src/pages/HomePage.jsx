// The home page

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LatestSection from '../components/home_page/LatestSection.tsx';
import {
  BsCpu,
  BsFan,
  BsGpuCard,
  BsHdd,
  BsPc,
  BsPcDisplay,
  BsMemory,
  BsMotherboard,
  BsPower,
  BsSnow,
} from 'react-icons/bs';

function HomePage() {

  return (
    <div className="space-y-10 p-6">
      <LatestSection
        title="Pre-builts"
        icon={<BsPcDisplay />}
        section="configurations"
        seeMoreLink="/config"
        uniqueIdentifier='config_id'
      />

      <LatestSection
        title="Processors"
        icon={<BsCpu />}
        section="processors"
        seeMoreLink="/processors"
      />

      <LatestSection
        title="Coolers"
        icon={<BsSnow />}
        section="coolers"
        seeMoreLink="/coolers"
      />

      <LatestSection
        title="Motherboards"
        icon={<BsMotherboard />}
        section="motherboards"
        seeMoreLink="/motherboards"
      />

      <LatestSection
        title="Memory"
        icon={<BsMemory />}
        section="Memory"
        seeMoreLink="/memory"
      />

      <LatestSection
        title="Disks"
        icon={<BsHdd />}
        section="disks"
        seeMoreLink="/disks"
      />

      <LatestSection
        title="Coolers"
        icon={<BsSnow />}
        section="coolers"
        seeMoreLink="/coolers"
      />

      <LatestSection
        title="Video Cards"
        icon={<BsGpuCard />}
        section="video-cards"
        seeMoreLink="/video-cards"
      />

      <LatestSection
        title="Coolers"
        icon={<BsSnow />}
        section="coolers"
        seeMoreLink="/coolers"
      />

      <LatestSection
        title="Cases"
        icon={<BsPc />}
        section="cases"
        seeMoreLink="/cases"
      />

      <LatestSection
        title="Fans"
        icon={<BsFan />}
        section="case-fans"
        seeMoreLink="/case-fans"
      />

      <LatestSection
        title="Power Supplies"
        icon={<BsPower />}
        section="power-supplies"
        seeMoreLink="/power-supplies"
      />

      <LatestSection
        title="Others"
        section="others"
        seeMoreLink="/others"
      />
    </div>
  );
}

export default HomePage;
