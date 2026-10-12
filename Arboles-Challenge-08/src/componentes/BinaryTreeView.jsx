import Tree from 'react-d3-tree';
import './BinaryTreeView.scss';

function BinaryTreeView({ data }) {
    if (!data) {
        return <p className="empty-tree">🌱 El árbol está vacío</p>;
    }

    return (
        <div className="binary-tree-view">
            <Tree
                data={data}
                orientation="vertical"
                pathFunc="step"
                translate={{ x: 500, y: 100 }}
                nodeSize={{ x: 80, y: 80 }}
                separation={{ siblings: 1.5, nonSiblings: 2 }}
                renderCustomNodeElement={({ nodeDatum }) => (
                    <g>
                        <circle r="22" fill="#d9e9e4" stroke="#059669" strokeWidth="2" />
                        <text
                            fill="black"
                            x="0"
                            y="5"
                            textAnchor="middle"
                            fontWeight="bold"
                            fontSize="14"
                        >
                            {nodeDatum.name}
                        </text>
                    </g>
                )}
            />
        </div>
    );
}

export default BinaryTreeView;