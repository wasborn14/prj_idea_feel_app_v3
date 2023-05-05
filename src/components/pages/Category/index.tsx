import { SideMenuLayout } from '@/components/templates/SideMenuLayout'
import { useRouter } from 'next/router'
import { IdeaList } from '@/components/organisms/IdeaList'
import { useIsSp } from '@/hooks/util/useIsSp'
// import dynamic from 'next/dynamic'

export const Category = () => {
  const isSp = useIsSp()
  const router = useRouter()
  const isFeel = router.query['category'] === 'feel' ? true : false

  // const DynamicFeel = dynamic(() => import('@/components/organisms/Feel').then((mod) => mod.FeelContents), {
  //   ssr: false
  // })

  return <SideMenuLayout>{isFeel ? <></> : <IdeaList vertical={isSp} />}</SideMenuLayout>
}
