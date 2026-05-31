import MinistryPage from '@/components/MinistryPage';

export const metadata = { title: '청소년부 - 물댄동산교회' };

export default function Page() {
  return (
    <MinistryPage
      title="청소년부"
      subtitle="다음 세대를 향한 비전"
      description="중학생과 고등학생을 위한 부서입니다.\n믿음 안에서 정체성을 세우고 비전을 발견하는 시간입니다."
      schedule={[
        { label: '예배 시간', value: '주일 오전 11시' },
        { label: '장소', value: '교회 3층 청소년부실' },
        { label: '대상', value: '중학생 ~ 고등학생' },
      ]}
      contact="031-553-0191"
    />
  );
}
