import {useState, useRef, useEffect} from 'react';
import './ContactForm.css';
import {Button, type ButtonProps} from '../Button/Button';
import {ErrorBoundary} from 'react-error-boundary';
import {useFormStatus} from 'react-dom';
import {ContactThanks} from './ContactThanks';
import {ArrowDownIcon} from '@/icons';

interface ContactInfo {
  name: string;
  email: string;
  companySize: string;
  message: string;
}

function SubmitButton(props: ButtonProps) {
  const {pending} = useFormStatus();
  return (
    <Button {...props} disabled={pending || props.disabled}>
      {props.children}
    </Button>
  );
}

export function ContactForm() {
  const [form, setForm] = useState<ContactInfo>({
    name: '',
    email: '',
    companySize: '1-20',
    message: '',
  });

  const [formValid, setFormValid] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setForm(prev => ({...prev, [name]: value}));
  };

  const sendMessage = async (formData: FormData) => {
    // TODO: 这里需要把表单数据发送到后端 具体的接口之后实现
    const values = Object.fromEntries(formData.entries()) as unknown as ContactInfo;
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('提交的表单数据：', values);
      setShowThanks(true); // 成功后展示感谢反馈
    }
    catch (error: unknown) {
      console.error('提交表单失败：', (error as Error).message);
      setError('出错了,请重试');
    }
  };

  useEffect(() => {
    if (formRef.current) {
      setFormValid(formRef.current.checkValidity());
    }
  }, [form]);

  return (
    <ErrorBoundary
      fallback={<p>There was an error while submitting the form</p>}
    >
      {error
        ? (
          <div className="contact-error">
            <Button type="error" attrType="button" onClick={() => setError(null)}>{error}</Button>
          </div>
        )
        : null}
      {showThanks ? <ContactThanks /> : (
        <form className="contact-form" action={sendMessage} ref={formRef}>
          <div className="form-item">
            <label htmlFor="contact-name">Full name</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder="Kevin"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-item">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="Kevin@xxx.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-item">
            <label htmlFor="contact-company-size">Company size</label>
            <div className="sp-select">
              <select
                id="contact-company-size"
                name="companySize"
                value={form.companySize}
                onChange={handleChange}
                required
              >
                <option value="1-20">1-20</option>
                <option value="21-100">21-100</option>
                <option value="101-500">101-500</option>
                <option value=">500">500+</option>
              </select>
              <div className="select__arrow" aria-hidden="true">
                <ArrowDownIcon />
              </div>
            </div>
          </div>
          <div className="form-item">
            <label htmlFor="contact-message">How can we help you ?</label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="I'm interested in ScopeDB..."
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
            />
          </div>
          <SubmitButton type="default" attrType="submit" disabled={!formValid}>Send message</SubmitButton>
        </form>
      )}
    </ErrorBoundary>
  );
}
