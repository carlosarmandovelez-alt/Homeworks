import { useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import './GraphView.scss';

function GraphView({ data }) {
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                setDimensions({ width, height });
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!data || data.nodes.length === 0) {
        return <p className="empty-graph">No hay datos para mostrar</p>;
    }

    const nodeColor = (node) => {
        if (node.type === 'city') return '#F59E0B';
        if (node.type === 'person') return '#10B981';
        return '#6B7280';
    };

    return (
        <div className="graph-view" ref={containerRef}>
            <ForceGraph2D
                graphData={data}
                width={dimensions.width}
                height={dimensions.height}
                nodeLabel="label"
                nodeColor={nodeColor}
                nodeRelSize={6}
                linkColor={() => 'rgba(255, 255, 255, 0.2)'}
                linkWidth={1}
                backgroundColor="#1E1E1E"
                cooldownTicks={200}
                d3AlphaDecay={0.02}
                d3VelocityDecay={0.3}
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const label = node.label;
                    const fontSize = 11 / globalScale;
                    const radius = node.type === 'city' ? 8 : 5;

                    
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
                    ctx.fillStyle = nodeColor(node);
                    ctx.fill();

                    
                    if (node.type === 'city') {
                        ctx.strokeStyle = '#F59E0B';
                        ctx.lineWidth = 2;
                        ctx.stroke();
                    }

                    
                    ctx.font = `bold ${fontSize}px Sans-Serif`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = '#F5F5F5';
                    ctx.fillText(label, node.x, node.y + radius + fontSize + 2);
                }}
            />
        </div>
    );
}

export default GraphView;