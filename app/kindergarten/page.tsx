import MinistryPage from '@/components/MinistryPage';

export const metadata = { title: '유치부 - 물댄동산교회' };

export default function Page() {
  return (
    <MinistryPage
      title="유치부"
      subtitle="어린이들이 처음 만나는 예수님"
      description="만 4세부터 7세까지의 어린이를 위한 부서입니다.\n노래와 율동, 성경 이야기로 예수님의 사랑을 배웁니다."
      schedule={[
        { label: '예배 시간', value: '주일 오전 11시' },
        { label: '장소', value: '교회 2층 유치부실' },
        { label: '대상', value: '만 4세 ~ 7세' },
      ]}
      contact="031-553-0191"
    />
  );
}
