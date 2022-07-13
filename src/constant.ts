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

export const blogRootPath =
  '/Users/yukee798/Downloads/remain/Yukee-798.github.io/blog';
