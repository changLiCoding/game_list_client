import React from 'react';
import { useParams } from 'react-router-dom';

function GameDetail() {
  const { id, name } = useParams;

  return <div>GameDetail</div>;
}

export default GameDetail;
