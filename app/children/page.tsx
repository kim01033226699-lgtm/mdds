import MinistryPage from '@/components/MinistryPage';

export const metadata = { title: '아동부 - 물댄동산교회' };

export default function Page() {
  return (
    <MinistryPage
      title="아동부"
      subtitle="신앙의 기초를 세우는 시간"
      description="초등학교 1학년부터 6학년까지의 어린이를 위한 부서입니다.\n말씀과 찬양, 친교를 통해 신앙의 기초를 다집니다."
      schedule={[
        { label: '예배 시간', value: '주일 오전 11시' },
        { label: '장소', value: '교회 2층 아동부실' },
        { label: '대상', value: '초등학교 1~6학년' },
      ]}
      contact="031-553-0191"
    />
  );
}
