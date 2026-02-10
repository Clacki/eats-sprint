/** @format */

export default function ErrorMessage({ status }) {
  let message = "요청 중 오류가 발생했습니다.";

  if (status === 404) message = "요청하신 데이터를 찾을 수 없습니다. (404)";
  else if (status >= 500) message = `서버 오류가 발생했습니다. (${status})`;
  else if (status) message = `요청 중 오류가 발생했습니다. (${status})`;

  return (
    <div className="p-4">
      <p>{message}</p>
    </div>
  );
}
