import {h} from 'vue'
import {ElIcon} from 'element-plus'

/**
 * 批量注册 svg 为 Element Plus Icon
 * 使用方式：
 *   <el-button :icon="Icon收藏" />
 *   <el-icon><Icon我的学习 /></el-icon>
 */
export function registerSvgIcons(app) {
    // 读取 src/svg 下所有 svg
    const svgModules = import.meta.glob('@/svg/*.svg', {eager: true})

    Object.entries(svgModules).forEach(([path, mod]) => {
        const fileName = path.split('/').pop()

        const rawName = fileName.replace(/\.svg$/i, '')

        const componentName = `Icon${rawName}`

        const SvgComponent = mod.default

        const WrappedIcon = {
            name: componentName,
            setup() {
                return () =>
                    h(
                        ElIcon,
                        null,
                        {
                            default: () => h(SvgComponent),
                        }
                    )
            },
        }
        app.component(componentName, WrappedIcon)
    })
}
