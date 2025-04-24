import type { Plugin } from "vite";
import fg from "fast-glob";

/** 插件参数 */
interface PreloadImageProps {
    // 图片路径, 支持多路径
    imageDirs: string[];
    // link标签属性
    attrs?: {
        rel?: "preload" | "prefetch"; // 链接文档与当前文档的关系,默认prefetch
    };
}

/**
 *  图片预加载vite插件
 *  @param {PreloadImageProps} options
 */

export const preloadImage = (options: PreloadImageProps): Plugin => {
    const { imageDirs = [], attrs = {} } = options || {};

    const bundleImages: string[] = [];

    let isBuild = false;
    let base: string;

    return {
        name: "vite-plugin-preload-image",
        configResolved(resolvedConfig) {
            isBuild = resolvedConfig.command === "build";
            base = resolvedConfig.base || "/";
        },
        generateBundle(_, bundle) {
            // 获取所有打包文件
            const values = Object.values(bundle);

            for (const imageDir of imageDirs) {
                const isPublic = imageDir.startsWith("public"); // 是否public目录下
                if (isPublic) continue;
                const files = fg.sync(imageDir);

                // 找出和图片资源匹配的打包文件
                values.forEach((file) => {
                    if (files.some((item) => item.includes(Reflect.get(file, "name")))) {
                        bundleImages.push(file.fileName);
                    }
                });
            }
        },
        transformIndexHtml() {
            const images: string[] = [];

            for (const imageDir of imageDirs) {
                const isPublic = imageDir.startsWith("public"); // 是否public目录下
                const files = fg.sync(imageDir); // 图片文件路径
                if (isPublic) {
                    // 移除路径中的public/
                    const realFiles = files.map((item) => item.replace("public/", "")).map((file) => base + file);
                    images.push(...realFiles);
                } else {
                    const realFiles = isBuild ? bundleImages : files.map((file) => base + file);
                    images.push(...realFiles);
                }
            }

            return images.map((href) => {
                return {
                    tag: "link",
                    attrs: {
                        rel: "prefetch", // 默认prefetch
                        href,
                        as: "image",
                        ...attrs,
                    },
                };
            });
        },
    };
};
