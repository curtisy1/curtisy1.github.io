import React, { useEffect, useRef } from 'react';
import ForceGraph2D, { ForceGraphMethods, NodeObject } from 'react-force-graph-2d';
import { Color, Page } from '../enums';
import store from '../store';
import { CustomNodeObject } from '../types/CustomNodeObject';

interface INavigationGraphProps {
  small?: boolean;
}

function graphData() {
  return {
    nodes: [
      {
        id: 'home',
        page: Page.Home,
        description: 'curtisy\'s devblog',
      },
      {
        id: 'about',
        page: Page.About,
        description: 'About',
      },
      {
        id: 'blog',
        page: Page.Blog,
        description: 'Blog',
      },
      {
        id: 'projects',
        page: Page.Projects,
        description: 'Projects',
      },
    ],
    links: [
      {
        source: 'home',
        target: 'about',
      },
      {
        source: 'home',
        target: 'blog',
      },
      {
        source: 'home',
        target: 'projects',
      },
    ]
  }
}

function renderCanvasObject(node: NodeObject, ctx: CanvasRenderingContext2D) {
  const { x, y, page, description } = (node as CustomNodeObject);

  if (!x || !y) {
    return;
  }

  ctx.beginPath();
  ctx.arc(x, y, 25, 0, 2 * Math.PI, false);
  ctx.fillStyle = getColor(page);
  ctx.fill();

  ctx.fillStyle = '#000000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const descriptionArr = description.split(' ');
  if (descriptionArr.length > 1) {
    // special case: handle the site's name
    ctx.fillText(descriptionArr[0], x, y - 5);
    ctx.fillText(descriptionArr[1], x, y + 5);
  } else {
    ctx.fillText(descriptionArr[0], x, y);
  }
}

function getColor(page: Page) {
  switch (page) {
    case Page.Home:
      return Color.Blue;
    case Page.About:
      return Color.Green;
    case Page.Blog:
      return Color.Red;
    case Page.Projects:
      return Color.Yellow;
    default:
      return Color.Gray;
  }
}

export default function NavigationGraph(props: INavigationGraphProps) {
  const [state, update] = store.usePureStore();
  const graphRef = useRef<ForceGraphMethods>();

  if(!props.small) {
    useEffect(() => {
      const graph = graphRef.current;
      if (graph) {
        (graph.d3Force('link') as any)?.distance(50);
        (graph.d3Force('charge') as any)?.strength(-1000);
      }
    });

    useEffect(() => {
      // TODO: Limit the resizing so the component doesn't update every x ms
      window.onresize = () => {
        update({ height: window.innerHeight, width: window.innerWidth });
      }

      return () => {
        window.onresize = null;
      }
    });
  }

  return (
    <ForceGraph2D
      width={state.width}
      height={state.height}
      ref={graphRef}
      graphData={graphData()}
      nodeCanvasObject={renderCanvasObject}
      enableZoomPanInteraction={false}
      linkWidth={7}
      onNodeClick={(node: NodeObject) => update({ activePage: (node as CustomNodeObject).page })}
    />
  )
}