'use client'
import { useEffect, useState } from "react";
import { fetchParts } from "@/lib/fetchParts";
import LatestPartsGrid from "./LatestPartsGrid";
import LatestConfigurationsGrid from "./LatestConfigurationsGrid";

// The Pre-builts section
export function HomeConfigsSection() {
  const [configurations, setConfigurations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParts("0", ["Core Count", "Thread Count", "Series", "Socket"]).then(data => {
      setConfigurations(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      {loading ? <p className="text-gray-500">Fetching processors…</p> : <LatestConfigurationsGrid configs={configurations} />}
    </div>
  );
}

// The Processors section
export function HomeProcessorsSection() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParts("0", ["Core Count", "Thread Count", "Series", "Socket"]).then(data => {
      setParts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      {loading ? <p className="text-gray-500">Fetching processors…</p> : <LatestPartsGrid parts={parts} />}
    </div>
  );
}

// The Coolers section
export function HomeCoolersSection() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParts("1", ["CPU Socket"]).then(data => {
      setParts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      {loading ? <p className="text-gray-500">Fetching coolers…</p> : <LatestPartsGrid parts={parts} />}
    </div>
  );
}

// The Motherboards section
export function HomeMotherboardsSection() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParts("4", ["Form Factor", "Socket"]).then(data => {
      setParts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      {loading ? <p className="text-gray-500">Fetching motherboards…</p> : <LatestPartsGrid parts={parts} />}
    </div>
  );
}

// The Memory section
export function HomeMemorySection() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParts("5", ["ECC / Registered", "Form Factor", "Speed"]).then(data => {
      setParts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      {loading ? <p className="text-gray-500">Fetching memory modules…</p> : <LatestPartsGrid parts={parts} />}
    </div>
  );
}

// The Disks section
export function HomeDisksSection() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParts("6", ["Capacity", "Form Factor", "Type"]).then(data => {
      setParts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      {loading ? <p className="text-gray-500">Fetching disks…</p> : <LatestPartsGrid parts={parts} />}
    </div>
  );
}

// The Video Cards section
export function HomeVideoCardsSection() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParts("2", ["Chipset", "Memory"]).then(data => {
      setParts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      {loading ? <p className="text-gray-500">Fetching video cards…</p> : <LatestPartsGrid parts={parts} />}
    </div>
  );
}

// The Cases section
export function HomeCasesSection() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParts("7", ["Motherboard Form Factor"]).then(data => {
      setParts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      {loading ? <p className="text-gray-500">Fetching cases…</p> : <LatestPartsGrid parts={parts} />}
    </div>
  );
}

// The Case Fans section
export function HomeCaseFansSection() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParts("8", ["Size"]).then(data => {
      setParts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      {loading ? <p className="text-gray-500">Fetching case fans…</p> : <LatestPartsGrid parts={parts} />}
    </div>
  );
}

// The Power Supplies section
export function HomePowerSuppliesSection() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParts("3", ["Efficiency Rating", "Wattage"]).then(data => {
      setParts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      {loading ? <p className="text-gray-500">Fetching power supplies…</p> : <LatestPartsGrid parts={parts} />}
    </div>
  );
}

// The Others section
export function HomeOthersSection() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParts("9", []).then(data => {
      setParts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      {loading ? <p className="text-gray-500">Fetching other stuff…</p> : <LatestPartsGrid parts={parts} />}
    </div>
  );
}
