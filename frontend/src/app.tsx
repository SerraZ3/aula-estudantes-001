import { AvatarDropdown } from '@/components';
import { CheckCircleFilled, LinkOutlined, UserOutlined } from '@ant-design/icons';
import { type Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { Avatar, ConfigProvider, notification } from 'antd';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import authService from './services/auth';
import { useEffect } from 'react';
//import { useEffect, useState } from 'react';
//import balanceAndPricesService, { TCoins } from './services/balanceAndPrices';

// const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/login';
const noAuth = [
  '/reset-password',
  loginPath,
  '/email-verification',
  '/sign-in',
  '/termo-de-uso.pdf',
];

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * Aqui altera as informações do menu
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: any;
  loading?: boolean;
  fetchUserInfo?: () => Promise<any>;
}> {
  const { location } = history;
  const fetchUserInfo = async () => {
    console.log('fetchUserInfo');

    try {
      const msg = await authService.checkLogin();
      return msg.user;
    } catch (error) {
      if (!noAuth.includes(location.pathname)) {
        history.push(loginPath);
      }
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (!noAuth.includes(location.pathname)) {
    const currentUser = await fetchUserInfo();
    console.log(currentUser);
    console.log('fetchUserInfo 2');
    return {
      fetchUserInfo,
      currentUser,
      settings: { ...(defaultSettings as Partial<LayoutSettings>) },
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

export function rootContainer(container: React.ReactNode) {
  return (
    <ConfigProvider
      theme={{
        // algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#336699',
          colorInfo: '#336699',
          colorSuccess: '#55ea0b',
          colorWarning: '#e4712e',
          colorError: '#f11c1f',
          // Altera borda de tudo
          borderRadius: 10,
          // colorBgBase: '#1E2329',
          // colorBgContainer: 'red',
          // colorBgLayout: 'yellow',
          // colorFill: 'red',
          // colorPrimaryBg: '#336699',
          // colorWhite: 'blue',
          // colorLink: '#336699',
          // colorLinkActive: 'pink',
          // colorLinkHover: '#336699aa',
          // colorText: '#ffffff',
        },
        components: {
          // Button: {
          //   defaultColor: 'white',
          //   defaultBg: '#336699',
          //   defaultBorderColor: '#336699',
          //   defaultHoverBg: '#336699aa',
          //   defaultHoverColor: 'white',
          // },
          // Input: {
          //   // colorBgContainer: '#1E2329',
          //   // colorBgTextActive: 'red',
          //   colorText: '#ffffff',
          //   // colorBorder: 'white',
          //   colorTextBase: 'white',
          //   colorTextPlaceholder: '#ffffff33',
          //   colorBorder: 'transparent',
          //   colorBorderSecondary: 'transparent',
          //   colorIcon: '#ffffffaa',
          //   // colorPrimary: 'white',
          //   // colorError: 'blue',
          //   // colorErrorText: 'blue',
          //   colorTextDescription: '#ffffff',
          //   colorTextDisabled: '#ffffff88',
          //   colorBgContainerDisabled: '#1E2329',
          //   controlItemBgActiveDisabled: '#1E2329',
          // },
          // Table: {
          //   colorBgContainer: '#1E2329',
          //   padding: 10,
          //   paddingContentHorizontal: 10,
          //   paddingContentVertical: 20,
          // },
          // // ProTable: {},
          // Card: {
          //   colorBgContainer: '#1E2329',
          //   colorPrimaryBg: 'blue',
          // },
        },
      }}
    >
      {container}
    </ConfigProvider>
  );
}
// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }: any) => {
  // console.log(initialState)
  let logo = initialState?.settings as any;
  logo = logo ? logo.logo || '' : '';

  return {
    // actionsRender: () => [<Question key="doc" />, <SelectLang key="SelectLang" />],
    // actionsRender: () => {
    //   //const [balance, setBalance] = useState<{ [key in TCoins]: string }>();
    //   //const getBalance = async () => {
    //   //try {
    //   //const _balance = await balanceAndPricesService.balance();
    //   //setBalance(_balance.balance);
    //   //setTimeout(() => {}, 1000);
    //   //} catch (error) {
    //   //setTimeout(() => {}, 1000);
    //   //console.log(error);
    //   //}
    //   //};
    //   //useEffect(() => {
    //   //getBalance();
    //   //}, []);
    //   return [
    //     <span style={{ color: '#52C41A', fontSize: 10 }}>
    //       {initialState &&
    //         initialState.currentUser &&
    //         `${createMath().fixit(initialState.currentUser.balances.brl.value, 2)} BRL`}{' '}
    //     </span>,
    //   ];
    // },
    avatarProps: {
      // ! Precisa adicionar um icon de avatar
      src: <Avatar style={{ backgroundColor: '#336699' }} icon={<UserOutlined />} />,
      title: <span>{initialState?.currentUser?.fullname} </span>,
      render: (_, avatarChildren: any) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    // waterMarkProps: {
    //   content: "Lucas",
    // },
    // menuContentRender: () => <div>E ai</div>,
    // menuRender: () => <div>E ai</div>,
    headerTitleRender: () => <img src={logo} alt="logo" />,

    footerRender: () => '',
    // <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    // bgLayoutImgList: [
    //   {
    //     src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
    //     left: 85,
    //     bottom: 100,
    //     height: '303px',
    //   },
    //   {
    //     src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
    //     bottom: -68,
    //     right: -45,
    //     height: '303px',
    //   },
    //   {
    //     src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
    //     bottom: 0,
    //     left: 0,
    //     width: '331px',
    //   },
    // ],
    links: [
      // <a key="documentation" href="https://docs.sakcripto.com" rel="noreferrer" target="_blank">
      //   <QuestionCircleOutlined />
      //   <span>Suporte</span>
      // </a>,
      <a key="documentation" href="https://docs.sakcripto.com" rel="noreferrer" target="_blank">
        <LinkOutlined />
        <span>Documentação</span>
      </a>,
    ],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children: any) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}

          {/* <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState: any) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            /> */}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
