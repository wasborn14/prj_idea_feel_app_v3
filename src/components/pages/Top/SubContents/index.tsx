import styled from 'styled-components'
import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import { sp } from '@/media'
import { useIsSp } from '@/hooks/util/useIsSp'

const SUB_CONTENTS_DESCRIPTION_1 = '階層構造のメモで思考を整理します'

const SUB_CONTENTS_DESCRIPTION_2 = '感情の上がり下がりの傾向を掴み対策を行います'

// const SUB_CONTENTS_DESCRIPTION_3 = "日々学んだことや記録したいことをまとめます";

export const SubContents = () => {
  const isSp = useIsSp()

  return (
    <>
      <SubContentsWrapper>
        <SubContentsImageWrapper>
          <img
            src='/assets/images/title_sub_contents_image2.png'
            alt=''
            width={isSp ? 340 : 700}
            height={isSp ? 190 : 400}
          />
        </SubContentsImageWrapper>
        <SubContentsTitleContainer>
          <SubContentsTitle>考え方の整理</SubContentsTitle>
          <Description>{SUB_CONTENTS_DESCRIPTION_1}</Description>
        </SubContentsTitleContainer>
      </SubContentsWrapper>
      <SubContentsWrapper>
        <SubContentsTitleContainer>
          <SubContentsTitle>感情の記録と観察</SubContentsTitle>
          <Description>{SUB_CONTENTS_DESCRIPTION_2}</Description>
        </SubContentsTitleContainer>
        <SubContentsImageWrapper>
          <img
            src='/assets/images/title_sub_contents_image1.png'
            alt=''
            width={isSp ? 340 : 700}
            height={isSp ? 190 : 400}
          />
        </SubContentsImageWrapper>
      </SubContentsWrapper>
      {/* <SubContentsWrapper>
        <SubContentsImageWrapper>
          <img
            src="/assets/images/title_sub_contents_image3.png"
            alt=""
            width={isSp ? 340 : 700}
            height={isSp ? 190 : 400}
          />
        </SubContentsImageWrapper>
        <SubContentsTitleContainer>
          <SubContentsTitle>知識の蓄積</SubContentsTitle>
          <Description>{SUB_CONTENTS_DESCRIPTION_3}</Description>
        </SubContentsTitleContainer>
      </SubContentsWrapper> */}
    </>
  )
}

const SubContentsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  ${sp`
    flex-direction: column;
  `}
`

const SubContentsImageWrapper = styled.div`
  margin: 70px 20px;
  border-radius: 4px;
  opacity: 1;
  background-color: ${Color.WHITE};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  ${sp`
    margin: 28px 20px;
    order: 2;
  `}
`

const SubContentsTitleContainer = styled.div`
  margin: 70px 20px;
  ${sp`
    margin: 28px 20px;
    order: 1;
  `}
`

const SubContentsTitle = styled.h2`
  color: ${Color.BLACK};
  ${fontStyles['24px']}
  ${sp`
    ${fontStyles['20px']}
  `}
`

const Description = styled.p`
  margin-top: 24px;
  color: ${Color.LIGHT_GRAY2};
  white-space: pre-wrap;
  ${fontStyles['16px']}
  ${sp`
    margin-top: 16px;
    ${fontStyles['12px']}
  `}
`
