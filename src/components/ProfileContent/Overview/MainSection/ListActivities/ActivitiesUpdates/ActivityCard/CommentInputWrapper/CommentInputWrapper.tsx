import React, { useState } from 'react';

import PostInput from '@/components/ProfileContent/Overview/MainSection/ListActivities/PostInput';

function CommentInputWrapper({
  commentType,
  commentId,
}: {
  commentType: 'StatusUpdate' | 'Post' | undefined;
  commentId: string;
}) {
  const [comment, setComment] = useState('');
  return (
    <div>
      <PostInput
        comment={comment}
        setComment={setComment}
        type="comment"
        commentType={commentType}
        commentId={commentId}
      />
    </div>
  );
}

export default CommentInputWrapper;
