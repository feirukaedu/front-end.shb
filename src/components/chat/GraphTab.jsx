import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ForceGraph2D from 'react-force-graph-2d';
import { graphDataScenarios } from '../../data/mockData';

export default function GraphTab({ currentTopic, activeTab }) {
  const graphRef = useRef();

  useEffect(() => {
    if (graphRef.current && activeTab === 'graph') {
      graphRef.current.d3Force('charge').strength(-400); 
      graphRef.current.d3Force('link').distance(100); 
      graphRef.current.zoomToFit(200, 50);
    }
  }, [currentTopic, activeTab]);

  return (
    <motion.div key="graph-tab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-start">
      <div className="w-full bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 mb-4 flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400">NEO4J / KNOWLEDGE GRAPH CONNECTED</span>
      </div>

      <div className="w-full flex-1 min-h-[500px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl relative overflow-hidden flex items-center justify-center shadow-inner">
        <ForceGraph2D
          ref={graphRef}
          width={400}
          height={500}
          graphData={graphDataScenarios[currentTopic]}
          nodeLabel="desc"
          nodeColor="color"
          linkColor="color"
          linkWidth={2}
          linkDirectionalArrowLength={4}
          linkDirectionalArrowRelPos={1}
          linkCurvature={0.2}
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.3}
          cooldownTicks={100}
          onEngineStop={() => {
            if (graphRef.current) {
              graphRef.current.zoomToFit(400, 50);
            }
          }}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.name;
            const fontSize = 14 / globalScale; 
            ctx.font = `bold ${fontSize}px Sans-Serif`;
            
            const radius = Math.sqrt(node.val) * 2; 
            
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = node.color;
            ctx.fill();
            
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(label, node.x, node.y);
          }}
        />
      </div>
    </motion.div>
  );
}
