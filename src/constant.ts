export const initialBlogContent = (
  blogTitle: string,
  blogTags: string,
  desc: string
) => `
---
slug: ${blogTitle}
title: ${blogTitle}
tags: ${blogTags}
---

${desc}

<!--truncate-->
`;
