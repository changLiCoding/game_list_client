import React, { useState } from 'react';

import PostInput from '@/components/ProfileContent/Overview/MainSection/ListActivities/PostInput';

function CommentInputWrapper({
  commentType,
  commentId,
}: {
  commentType: string | undefined;
  commentId: string;
}) {
  const [comment, setComment] = useState<string>('');
  return (
    <div>
      <PostInput
        comment={comment}
        setComment={setComment}
        commentType={commentType}
        commentId={commentId}
      />
    </div>
  );
}

export default CommentInputWrapper;
