import React from 'react';

const defaultNoticeText = "© 2025 NareshTODO. All rights reserved";

export default function CopyRightNotice({noticeText = defaultNoticeText}){
    
    return <p className="getting-started-copyright-text">{noticeText}</p>
}   