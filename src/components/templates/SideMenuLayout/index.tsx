import { ReactNode } from 'react'
import { Layout } from '../Layout'
import ResizeLayout from './ResizeLayout'
import { useIsSp } from '@/hooks/util/useIsSp'
import { SpLayout } from './SpLayout'
import { CategoryList } from '@/components/organisms/CategoryList'
import { SideMainMenu } from '@/components/organisms/SideMainMenu'
import { Spacer } from '@/components/atoms/Spacer'
import styled from 'styled-components'
import { pc, sp } from '@/media'
import { useSelector } from 'react-redux'
import { sideWidthSelector } from '@/store/app/window'
import { ZIndex } from '@/const'

type Props = {
  children: ReactNode
}

export const SideMenuLayout = ({ children }: Props) => {
  const isSp = useIsSp()
  const sideWidth = useSelector(sideWidthSelector)

  return (
    <Layout meta={{ pageTitle: 'Ifee - MyPage' }}>
      {isSp ? (
        <SpLayout
          sideNavContents={
            <>
              <SideMainMenu />
              <Spacer y={80} />
              <CategoryList />
            </>
          }
        >
          {children}
        </SpLayout>
      ) : (
        <ResizeLayout
          sideNavContents={
            <PcWrapper sideWidth={sideWidth}>
              <SideMainMenu />
              <CategoryList />
            </PcWrapper>
          }
        >
          {children}
        </ResizeLayout>
      )}
    </Layout>
  )
}

const PcWrapper = styled.div<{ sideWidth: number }>`
  z-index: ${ZIndex.SideMenuContent};
  width: ${({ sideWidth }) => sideWidth}px;
  ${pc`
    position: fixed;
    height: 100vh;
    overflow-y: scroll;
    /*スクロールバー非表示（Chrome・Safari）*/
    &::-webkit-scrollbar{
      display:none;
    }
  `}
  ${sp`
    width: 100%;
  `}
`
