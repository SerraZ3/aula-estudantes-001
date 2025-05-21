import DashboardTemplate from '@/components/DashboardTemplate';
import studentFilesService from '@/services/studentFiles';
import studentsService from '@/services/students';
import { history, useModel, useParams } from '@umijs/max';
import { Button, Card, Flex } from 'antd';
import { useEffect, useState } from 'react';

const Student: React.FC = () => {
  const [student, setStudent] = useState<any>();
  const [files, setFiles] = useState<any>();
  const params = useParams();

  const openPdf = (url: string, name = 'Visualizar arquivo') => {
    let pdfWindow = window.open('');

    if (!pdfWindow) return;
    // let pdfWindow = window.open("");
    pdfWindow.document.write(
      '<html<head><title>' + name + '</title><style>body{margin: 0px;}</style></head>',
    );
    pdfWindow.document.write(
      "<body><embed width='100%' height='100%' src='" +
        encodeURI(url) +
        "#toolbar=0&navpanes=0&scrollbar=0'></embed></body></html>",
    );
    pdfWindow.document.close();

    // pdfWindow.document.write(
    //   `<iframe width='100%' height='100%' src="${encodeURI(url)}"></iframe>`,
    // );
  };
  const PdfViewer = ({ pdfUrl }: { pdfUrl: string }) => {
    return (
      <Card title="Visualizador de PDF" style={{ height: '80vh' }}>
        <iframe src={pdfUrl} width="100%" height="100%" style={{ border: 'none' }} />
      </Card>
    );
  };

  const getStudent = async () => {
    try {
      let res = await studentsService.show(params.id as string);
      setStudent(res.data);

      let resFile = await studentFilesService.list(params.id as string);
      setFiles(resFile.files);
      console.log(resFile.files);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params.id) {
      getStudent();
    }
  }, [params]);
  return (
    <DashboardTemplate>
      <Button
        type="link"
        onClick={() => {
          history.back();
        }}
      >
        Voltar
      </Button>
      <Flex>
        <Card style={{ width: '50%' }}>
          <p>Nome: {student && student.fullname}</p>
          <p>E-mail: {student && student.cpf}</p>
          <p>Permissões: {student && student.birthdate}</p>
        </Card>
        <Card style={{ width: '50%' }}>
          <p>Documentos: {files && files.length}</p>
          {files &&
            files.map((file: any, idx: any) => {
              return (
                <>
                  <Button
                    type="link"
                    style={{ padding: 0 }}
                    onClick={() => {
                      openPdf(file);
                    }}
                  >
                    Abrir documento
                  </Button>
                  <br />
                </>
              );
            })}
        </Card>
      </Flex>
    </DashboardTemplate>
  );
};

export default Student;
