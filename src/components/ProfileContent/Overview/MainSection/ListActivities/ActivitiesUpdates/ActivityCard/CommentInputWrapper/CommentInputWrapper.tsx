import React, { useState } from 'react';

import PostInput from '@/components/ProfileContent/Overview/MainSection/ListActivities/PostInput';

function CommentInputWrapper() {
  const [comment, setComment] = useState('');
  return (
    <div>
      <PostInput comment={comment} setComment={setComment} type="comment" />
    </div>
  );
}

export default CommentInputWrapper;
