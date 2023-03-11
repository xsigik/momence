import { Alert, AlertTitle, Container } from '@mui/material';
import { Component, ErrorInfo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: string;
}

const ErrorFallback: React.FC<{ error: string }> = ({ error }) => {
  const { t } = useTranslation();
  return (
    <Container maxWidth="sm">
      <Alert severity="error">
        <AlertTitle>{t('error.app')}</AlertTitle>
        {error}
      </Alert>
    </Container>
  );
};

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}
