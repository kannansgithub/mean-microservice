import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default ({ comments }) => {
  const renderedComments = comments.map(comment => {
    let content;
    if(comment.status==='approved'){
      content =comment.content;
    }
    if(comment.status==='rejected'){
      content ='this comment has been rejected';
    }
    if(comment.status==='pending'){
      content ='this comment is awiting for moderation';
    }
    
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
