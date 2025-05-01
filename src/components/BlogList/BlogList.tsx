import {Card} from '../Card';
import {useMedia} from '@/hooks/media';
import type {BlogData, RankedBlogData} from '../../pages/blog/interface';
import type {CardSize} from '../Card';

import './BlogList.css';
import {useMemo} from 'react';
interface Props {
  allPosts: BlogData[];
  topPosts: RankedBlogData[];
}
export function BlogList(props: Props) {
  const {allPosts, topPosts} = props;
  const [topOnePost, ...topNPost] = topPosts;
  const isMobile = useMedia('(max-width:720px)');
  const pc = ['large', 'small', 'medium'];
  const mobile = ['tiny', 'tiny', 'tiny'];
  const sizeMap = {
    pc,
    mobile,
  };
  const memoSize = useMemo(() => {
    let sizeTuple;
    if (isMobile) {
      sizeTuple = sizeMap.mobile;
    }
    else {
      sizeTuple = sizeMap.pc;
    }
    return sizeTuple as CardSize[];
  }, [isMobile]);

  return (
    <div className="blog-list">
      {/* TODO: 订阅 RSS */}
      {/* <div className="blog-list-header">ScopeDB Blog</div> */}
      <div className="list-container">
        <div className="top-posts-grid">
          <div className="top-post-main">
            {topOnePost && <Card {...topOnePost} size={memoSize[0]} />}
          </div>
          <div className="top-post-side">
            {topNPost && topNPost.map(post => <Card {...post} size={memoSize[1]} key={post.link} />)}
          </div>
        </div>
        <div className="blog-tab-bar">
          <div className="blog-tabs">
          </div>
          <div className="blog-search">
          </div>
        </div>
        <div className="blog-posts-grid">
          {allPosts.map(post => <Card {...post} size={memoSize[2]} key={post.link} />)}
        </div>
      </div>
    </div>
  );
}
