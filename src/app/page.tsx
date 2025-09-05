'use client';
import UIButton from '@/components/ui/button/UIButton';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import AppLayout from '@/components/app-layout/AppLayout';
import CardItem from '@/components/main-page/card-item/CardItem';
import robot from '@/components/main-page/assets/robot.png';
import Image from 'next/image';
import abstract2 from '@/components/main-page/assets/abstract2.svg';
import butterfly from '@/components/main-page/assets/butterfly.svg';
import donut from '@/components/main-page/assets/donut.svg';
import mail from '@/components/main-page/assets/mail.svg';
import chatExample from '@/components/main-page/assets/chat-example.png';
import testExample from '@/components/main-page/assets/test-example.png';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { RootState } from '@/store';
import { useRandomButton } from '@/hooks/useRandomButton';
import logoTransparentFull from '@/assets/icons/gradior_transparent_full.png';
import AboutBlock from '@/components/main-page/about-block/AboutBlock';
import errorHandler from '@/core/utils/error/errorHandler';
import Api from '@/core/api/api';
import { setLoading } from '@/features/loading/loadingSlice';
import { getPublicFileLink } from '@/core/utils/files';
import { Trans } from '@/i18n/Trans';
import MessengerPopup from '@/components/messenger-popup/MessengerPopup';

const Home = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state: RootState) => state.user);

  const { selectedButton: mainButton } = useRandomButton({ user });

  const [privatePolicy, setPrivatePolicy] = useState<any>(null);
  const [personalTerms, setPersonalTerms] = useState<any>(null);

  const loadSystemFiles = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const privatePolicyFile = await Api.getSilent<undefined, any>('/system/files/privacy_policy');
      setPrivatePolicy(privatePolicyFile.payload);
      const personalTermsFile = await Api.getSilent<undefined, any[]>('/system/files/personal_terms');
      setPersonalTerms(personalTermsFile.payload);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    loadSystemFiles();
  }, [loadSystemFiles]);

  return (
    <AppLayout>
      <div id={'home'} />
      <div className={'lg:mt-6 lg:px-10'}>
        <section
          className={'lg:h-[758px] h-[544px] rounded-b-4xl flex flex-col justify-center items-center px-4'}
          style={{ background: 'var(--main-gradient)' }}
        >
          <div className={'max-w-full lg:max-w-[1100px] flex flex-col gap-6 text-center'}>
            <div className={'lg:text-[64px] text-[40px] leading-[100%] font-bold'}>
              <Trans
                ns={'main'}
                k={'main_title'}
              />
            </div>
            <div className={'lg:text-3xl text-base'}>
              <Trans
                ns={'main'}
                k={'main_subtitle'}
              />
            </div>
            <div className={'lg:text-lg text-base'}>
              <Trans
                ns={'main'}
                k={'main_description'}
              />
            </div>
            <div className={'mt-8'}>
              <UIButton
                iconAfter={'arrow-top-right'}
                onClick={mainButton.onClick}
              >
                {mainButton.children}
              </UIButton>
            </div>
          </div>
        </section>
        <section className={'w-full flex flex-col justify-center items-center mt-20 gap-19 px-4'}>
          <div className={'max-w-[1040px] lg:text-2xl text-xl font-semibold text-center'}>
            <Trans
              ns={'main'}
              k={'main_intruments_description'}
            />
          </div>
          <div className={'flex xl:flex-nowrap flex-wrap justify-center gap-6'}>
            <div className={'flex sm:flex-nowrap flex-wrap gap-6'}>
              <CardItem
                icon={'item-hut'}
                title={
                  <Trans
                    ns={'main'}
                    k={'main_card_title_1'}
                  />
                }
                description={
                  <Trans
                    ns={'main'}
                    k={'main_card_description_1'}
                  />
                }
                additional={
                  <Trans
                    ns={'main'}
                    k={'main_card_additional_1'}
                  />
                }
              />
              <CardItem
                icon={'item-list'}
                title={
                  <Trans
                    ns={'main'}
                    k={'main_card_title_2'}
                  />
                }
                description={
                  <Trans
                    ns={'main'}
                    k={'main_card_description_2'}
                  />
                }
                additional={
                  <Trans
                    ns={'main'}
                    k={'main_card_additional_2'}
                  />
                }
              />
            </div>
            <div className={'flex sm:flex-nowrap flex-wrap gap-6'}>
              <CardItem
                icon={'item-analize'}
                title={
                  <Trans
                    ns={'main'}
                    k={'main_card_title_3'}
                  />
                }
                description={
                  <Trans
                    ns={'main'}
                    k={'main_card_description_3'}
                  />
                }
                additional={
                  <Trans
                    ns={'main'}
                    k={'main_card_additional_3'}
                  />
                }
              />
              <CardItem
                icon={'item-education'}
                title={
                  <Trans
                    ns={'main'}
                    k={'main_card_title_4'}
                  />
                }
                description={
                  <Trans
                    ns={'main'}
                    k={'main_card_description_4'}
                  />
                }
                additional={
                  <Trans
                    ns={'main'}
                    k={'main_card_additional_4'}
                  />
                }
              />
            </div>
          </div>
        </section>
        <section
          className={
            'lg:h-[454px] h-[665px] rounded-b-4xl flex justify-center items-center lg:mt-[140px] mt-18 px-4 py-12'
          }
          style={{ background: 'var(--main-gradient)' }}
        >
          <div className={'w-full lg:max-w-[660px] flex flex-col gap-6 lg:text-left text-center'}>
            <div className={'text-4xl lg:text-5xl leading-[100%] font-bold'}>
              <Trans
                ns={'common'}
                k={'common_interview'}
              />
            </div>
            <div className={'lg:text-xl text-base'}>
              <Trans
                ns={'main'}
                k={'interview_description'}
              />
            </div>
            <Image
              className={'lg:hidden flex mx-auto'}
              height={300}
              src={chatExample}
              alt={'chat'}
            />
            <div>
              <UIButton
                iconAfter={'arrow-top-right'}
                onClick={() => {
                  router.push('/interview');
                }}
              >
                <Trans
                  ns={'main'}
                  k={'main_do_interview'}
                  format={'uppercase'}
                />
              </UIButton>
            </div>
          </div>
          <Image
            className={'hidden lg:flex ml-4'}
            src={chatExample}
            height={300}
            alt={'chat'}
          />
        </section>
        <section className={'flex flex-col lg:mt-20 mt-18 lg:gap-19 gap-8 px-4'}>
          <div className={'lg:text-2xl text-xl font-semibold text-center'}>
            <Trans
              ns={'main'}
              k={'main_interview_additional'}
            />
          </div>
          <div className={'lg:grid lg:grid-cols-[40%_1fr] lg:grid-rows-2 flex flex-col gap-6'}>
            <div
              className={
                'col-start-1 col-end-2 row-start-1 row-end-3 bg-main-black rounded-3xl p-6 relative lg:min-h-auto min-h-[292px]'
              }
            >
              <div className={'flex flex-col gap-4'}>
                <div className={'lg:text-xl text-base font-semibold leading-[100%]'}>
                  <Trans
                    ns={'main'}
                    k={'main_interview_card_title_1'}
                  />
                </div>
                <div className={'lg:max-w-[254px] max-w-[70%] lg:text-lg text-sm leading-[24px]'}>
                  <Trans
                    ns={'main'}
                    k={'main_interview_card_description_1'}
                  />
                </div>
              </div>
              <div className={'absolute bottom-0 right-0'}>
                <div className={'relative w-[250px] h-[250px]'}>
                  <div
                    className={'w-[250px] h-[250px] rounded-full bg-[#9073CB] blur-[120px] absolute right-0 bottom-0'}
                  />
                  <Image
                    className={'absolute -right-4 bottom-0'}
                    src={robot}
                    alt={'robot'}
                    height={220}
                    width={207}
                  />
                </div>
              </div>
            </div>
            <div
              className={
                'col-start-2 col-end-3 row-start-1 row-end-2 flex flex-col gap-4 bg-main-black rounded-3xl p-6'
              }
            >
              <div className={'lg:text-xl text-base font-semibold leading-[100%]'}>
                <Trans
                  ns={'main'}
                  k={'main_interview_card_title_2'}
                />
              </div>
              <div className={'lg:text-lg text-sm leading-[24px]'}>
                <Trans
                  ns={'main'}
                  k={'main_interview_card_description_2'}
                />
              </div>
            </div>
            <div
              className={
                'col-start-2 col-end-3 row-start-2 row-end-3 flex flex-col gap-4 bg-main-black rounded-3xl p-6'
              }
            >
              <div className={'lg:text-xl text-base font-semibold leading-[100%]'}>
                <Trans
                  ns={'main'}
                  k={'main_interview_card_title_3'}
                />
              </div>
              <div className={'lg:text-lg text-sm leading-[24px]'}>
                <Trans
                  ns={'main'}
                  k={'main_interview_card_description_3'}
                />
              </div>
            </div>
          </div>
          <div
            className={'mb-20'}
            id={'about'}
          />
        </section>
        <section className={'lg:pt-[80px] pt-18 px-4'}>
          <div className={'text-base text-text-disabled text-center font-bold mb-1 tracking-wide'}>
            <Trans
              ns={'main'}
              k={'main_about'}
            />
          </div>
          <div className={'text-4xl font-bold mb-6 tracking-wide text-center'}>
            <Trans
              ns={'main'}
              k={'main_about_additional'}
            />
          </div>
          <div className={'flex flex-wrap gap-6'}>
            <div className={'p-6 border border-main-gray rounded-3xl w-full'}>
              <div className={'text-xl font-bold'}>
                <Trans
                  ns={'main'}
                  k={'main_about_card_title_1'}
                />
              </div>
              <div className={'mt-4 lg:text-lg text-sm'}>
                <Trans
                  ns={'main'}
                  k={'main_about_card_description_1'}
                />
              </div>
            </div>
            <div className={'p-6 border border-main-gray rounded-3xl w-full'}>
              <div className={'text-xl font-bold'}>
                <Trans
                  ns={'main'}
                  k={'main_about_card_title_2'}
                />
              </div>
              <div className={'mt-4 lg:text-lg text-sm'}>
                <Trans
                  ns={'main'}
                  k={'main_about_card_description_2'}
                />
              </div>
            </div>
          </div>
          <div className={'flex mt-10 gap-6 lg:flex-nowrap flex-wrap'}>
            <div className={'flex gap-6 w-full'}>
              <div
                className={'p-6 border border-main-gray rounded-3xl w-full min-h-[180px] flex flex-col justify-between'}
              >
                <div className={'text-4xl font-bold text-main-purple'}>
                  <Trans
                    ns={'main'}
                    k={'main_about_card_title_3'}
                  />
                </div>
                <div className={'lg:text-sm text-xs'}>
                  <Trans
                    ns={'main'}
                    k={'main_about_card_description_3'}
                  />
                </div>
              </div>
              <div
                className={'p-6 border border-main-gray rounded-3xl w-full min-h-[180px] flex flex-col justify-between'}
              >
                <div className={'text-4xl font-bold text-main-purple'}>
                  <Trans
                    ns={'main'}
                    k={'main_about_card_title_4'}
                  />
                </div>
                <div className={'lg:text-sm text-xs'}>
                  <Trans
                    ns={'main'}
                    k={'main_about_card_description_4'}
                  />
                </div>
              </div>
            </div>
            <div className={'flex gap-6 w-full'}>
              <div
                className={'p-6 border border-main-gray rounded-3xl w-full min-h-[180px] flex flex-col justify-between'}
              >
                <div className={'text-4xl font-bold text-main-purple'}>
                  <Trans
                    ns={'main'}
                    k={'main_about_card_title_5'}
                  />
                </div>
                <div className={'lg:text-sm text-xs'}>
                  <Trans
                    ns={'main'}
                    k={'main_about_card_description_5'}
                  />
                </div>
              </div>
              <div
                className={'p-6 border border-main-gray rounded-3xl w-full min-h-[180px] flex flex-col justify-between'}
              >
                <div className={'text-4xl font-bold text-main-purple'}>
                  <Trans
                    ns={'main'}
                    k={'main_about_card_title_6'}
                  />
                </div>
                <div className={'lg:text-sm text-xs'}>
                  <Trans
                    ns={'main'}
                    k={'main_about_card_description_6'}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className={'lg:h-[454px] rounded-b-4xl flex justify-center items-center lg:mt-[140px] mt-18 px-4 py-12'}
          style={{ background: 'var(--main-gradient)' }}
        >
          <div className={'w-full lg:max-w-[606px] flex flex-col gap-6 lg:text-left text-center'}>
            <div className={'text-4xl lg:text-5xl leading-[100%] font-bold'}>
              <Trans
                ns={'common'}
                k={'common_tests'}
              />
            </div>
            <div className={'lg:text-xl text-base'}>
              <Trans
                ns={'main'}
                k={'main_tests_description'}
              />
            </div>
            <Image
              className={'lg:hidden flex mx-auto'}
              height={300}
              src={testExample}
              alt={'chat'}
            />
            <div>
              <UIButton
                text={'НАЧАТЬ ТЕСТ'}
                iconAfter={'arrow-top-right'}
                onClick={() => {
                  router.push('/tests');
                }}
              >
                <Trans
                  ns={'main'}
                  k={'main_tests_start'}
                  format={'uppercase'}
                />
              </UIButton>
            </div>
          </div>
          <Image
            className={'hidden lg:flex ml-4'}
            height={300}
            src={testExample}
            alt={'chat'}
          />
        </section>
        <section className={'lg:mt-20 mt-18 flex lg:flex-row flex-col items-center h-full px-4'}>
          <div
            className={'w-full flex flex-col p-6 gap-4 border-1 border-main-gray rounded-3xl w-1/5 lg:min-h-[242px]'}
          >
            <div className={'lg:text-xl text-base font-semibold leading-[100%]'}>
              <Trans
                ns={'main'}
                k={'main_tests_card_title_1'}
              />
            </div>
            <div className={'lg:text-lg text-sm leading-[24px] flex flex-col gap-1'}>
              <span>
                <Trans
                  ns={'main'}
                  k={'main_level_junior'}
                />
              </span>
              <span>
                <Trans
                  ns={'main'}
                  k={'main_level_middle'}
                />
              </span>
              <span>
                <Trans
                  ns={'main'}
                  k={'main_level_senior'}
                />
              </span>
            </div>
          </div>
          <div className={'border-1 border-main-gray border-dashed lg:w-1/15 lg:h-0 h-8 w-0'} />
          <div
            className={'w-full flex flex-col p-6 gap-4 border-1 border-main-gray rounded-3xl w-1/5 lg:min-h-[242px]'}
          >
            <div className={'lg:text-xl text-base font-semibold leading-[100%]'}>
              <Trans
                ns={'main'}
                k={'main_tests_card_title_2'}
              />
            </div>
            <div className={'lg:text-lg text-sm leading-[24px]'}>
              <Trans
                ns={'main'}
                k={'main_tests_card_description_2'}
              />
            </div>
          </div>
          <div className={'border-1 border-main-gray border-dashed lg:w-1/15 lg:h-0 h-8 w-0'} />
          <div
            className={'w-full flex flex-col p-6 gap-4 border-1 border-main-gray rounded-3xl w-1/5 lg:min-h-[242px]'}
          >
            <div className={'lg:text-xl text-base font-semibold leading-[100%]'}>
              <Trans
                ns={'main'}
                k={'main_tests_card_title_3'}
              />
            </div>
            <div className={'lg:text-lg text-sm leading-[24px]'}>
              <Trans
                ns={'main'}
                k={'main_tests_card_description_3'}
              />
            </div>
          </div>
          <div className={'border-1 border-main-gray border-dashed lg:w-1/15 lg:h-0 h-8 w-0'} />
          <div
            className={'w-full flex flex-col p-6 gap-4 border-1 border-main-gray rounded-3xl w-1/5 lg:min-h-[242px]'}
          >
            <div className={'lg:text-xl text-base font-semibold leading-[100%]'}>
              <Trans
                ns={'main'}
                k={'main_tests_card_title_4'}
              />
            </div>
            <div className={'lg:text-lg text-sm leading-[24px]'}>
              <Trans
                ns={'main'}
                k={'main_tests_card_description_4'}
              />
            </div>
          </div>
        </section>
        <section
          className={'lg:h-[454px] h-[544px] rounded-b-4xl flex justify-center items-center lg:mt-[140px] mt-18'}
          style={{ background: 'var(--main-gradient)' }}
        >
          <div className={'w-full lg:max-w-[808px] flex flex-col gap-6 text-center'}>
            <div className={'lg:text-5xl text-4xl leading-[100%] font-bold'}>
              <Trans
                ns={'main'}
                k={'main_cv_check'}
              />
            </div>
            <div className={'lg:text-xl text-base'}>
              <Trans
                ns={'main'}
                k={'main_cv_check_description'}
              />
            </div>
            <div>
              <UIButton
                text={'ПРОВЕРИТЬ РЕЗЮМЕ'}
                iconAfter={'arrow-top-right'}
                onClick={() => {
                  router.push('/interview/resume-check');
                }}
              >
                <Trans
                  ns={'main'}
                  k={'main_do_check_cv'}
                  format={'uppercase'}
                />
              </UIButton>
            </div>
          </div>
        </section>
        <section className={'flex flex-col lg:mt-20 mt-18 lg:gap-19 gap-8 px-4'}>
          <div className={'text-2xl font-semibold text-center'}>
            <Trans
              ns={'main'}
              k={'main_cv_check_description_title'}
            />
          </div>
          <div className={'lg:grid lg:grid-cols-2 lg:grid-rows-[158px_158px] flex flex-col gap-6'}>
            <div className={'flex border-1 border-main-gray rounded-3xl p-4 relative overflow-hidden'}>
              <div className={'flex flex-col gap-4 max-w-[70%]'}>
                <div className={'lg:text-xl text-base font-semibold leading-[100%]'}>
                  <Trans
                    ns={'main'}
                    k={'main_cv_check_card_title_1'}
                  />
                </div>
                <div className={'lg:text-lg text-sm leading-[24px]'}>
                  <Trans
                    ns={'main'}
                    k={'main_cv_check_card_description_1'}
                  />
                </div>
              </div>
              <Image
                className={'absolute lg:right-0 lg:bottom-0 -right-15'}
                src={butterfly}
                alt={'abstract'}
              />
            </div>
            <div className={'flex border-1 border-main-gray rounded-3xl p-4 relative overflow-hidden'}>
              <div className={'flex flex-col gap-4 max-w-[70%]'}>
                <div className={'lg:text-xl text-base font-semibold leading-[100%]'}>
                  <Trans
                    ns={'main'}
                    k={'main_cv_check_card_title_2'}
                  />
                </div>
                <div className={'lg:text-lg text-sm leading-[24px]'}>
                  <Trans
                    ns={'main'}
                    k={'main_cv_check_card_description_2'}
                  />
                </div>
              </div>
              <Image
                className={'absolute lg:right-0 lg:bottom-3 -right-1 -bottom-2'}
                src={abstract2}
                alt={'abstract'}
              />
            </div>
            <div className={'flex border-1 border-main-gray rounded-3xl p-4 relative overflow-hidden col-span-full'}>
              <div className={'flex flex-col gap-4 max-w-[70%]'}>
                <div className={'lg:text-xl text-base font-semibold leading-[100%]'}>
                  <Trans
                    ns={'main'}
                    k={'main_cv_check_card_title_3'}
                  />
                </div>
                <div className={'lg:text-lg text-sm leading-[24px]'}>
                  <Trans
                    ns={'main'}
                    k={'main_cv_check_card_description_3'}
                  />
                </div>
              </div>
              <Image
                className={'absolute lg:right-0 lg:bottom-3 -bottom-2 -right-2'}
                src={donut}
                alt={'abstract'}
              />
            </div>
          </div>
        </section>
        <section
          className={'lg:h-[454px] h-[544px] rounded-b-4xl flex justify-center items-center lg:mt-[140px] mt-18'}
          style={{ background: 'var(--main-gradient)' }}
        >
          <div className={'w-full lg:max-w-[808px] flex flex-col gap-6 text-center'}>
            <div className={'lg:text-5xl text-4xl leading-[100%] font-bold'}>
              <Trans
                ns={'main'}
                k={'main_cv_create'}
              />
            </div>
            <div className={'lg:text-xl text-base'}>
              <Trans
                ns={'main'}
                k={'main_cv_create_description'}
              />
            </div>
            <div>
              <UIButton
                text={'СОЗДАТЬ РЕЗЮМЕ'}
                iconAfter={'arrow-top-right'}
                onClick={() => {
                  router.push('/interview/resume-create');
                }}
              >
                <Trans
                  ns={'main'}
                  k={'main_do_create_cv'}
                  format={'uppercase'}
                />
              </UIButton>
            </div>
            <div
              className={'mt-10'}
              id={'faq'}
            />
          </div>
        </section>
        <section className={'lg:pt-[80px] pt-18 px-4'}>
          <div className={'text-base text-text-disabled text-center font-bold mb-1 tracking-wide'}>
            <Trans
              ns={'common'}
              k={'common_faq'}
            />
          </div>
          <div className={'text-4xl font-bold mb-6 tracking-wide text-center'}>
            <Trans
              ns={'main'}
              k={'main_faq_title'}
            />
          </div>
          <div className={'flex flex-col gap-4'}>
            <AboutBlock
              title={
                <Trans
                  ns={'main'}
                  k={'main_faq_card_title_1'}
                />
              }
              content={
                <Trans
                  ns={'main'}
                  k={'main_faq_card_description_1'}
                />
              }
            />
            <AboutBlock
              title={
                <Trans
                  ns={'main'}
                  k={'main_faq_card_title_2'}
                />
              }
              content={
                <Trans
                  ns={'main'}
                  k={'main_faq_card_description_2'}
                />
              }
            />
            <AboutBlock
              title={
                <Trans
                  ns={'main'}
                  k={'main_faq_card_title_3'}
                />
              }
              content={
                <Trans
                  ns={'main'}
                  k={'main_faq_card_description_3'}
                />
              }
            />
            <AboutBlock
              title={
                <Trans
                  ns={'main'}
                  k={'main_faq_card_title_4'}
                />
              }
              content={
                <Trans
                  ns={'main'}
                  k={'main_faq_card_description_4'}
                />
              }
            />
            <AboutBlock
              title={
                <Trans
                  ns={'main'}
                  k={'main_faq_card_title_5'}
                />
              }
              content={
                <Trans
                  ns={'main'}
                  k={'main_faq_card_description_5'}
                />
              }
            />
          </div>
        </section>
      </div>
      <footer className={'lg:h-[300px] bg-main-black flex lg:items-center lg:justify-center mt-25 p-4'}>
        <div className={'flex lg:flex-row flex-col lg:gap-30 gap-12'}>
          <div className={'flex flex-col gap-8'}>
            <div className={'flex items-center'}>
              <Image
                src={logoTransparentFull}
                alt={'gradiorai'}
                height={32}
                width={32}
              />
              <div
                className={'ml-2 cursor-pointer text-white text-base'}
                onClick={() => router.push('/')}
              >
                <Trans
                  ns={'common'}
                  k={'common_sitename'}
                />
              </div>
            </div>
            <div className={'grow'} />
            {privatePolicy && personalTerms && (
              <div className={'flex flex-col gap-3 text-sm font-light text-text-low-white'}>
                <a
                  className={'cursor-pointer hover:underline hover:text-main-purple'}
                  target={'_blank'}
                  href={getPublicFileLink(personalTerms?.path || '')}
                  rel={'noreferrer'}
                >
                  <Trans
                    ns={'common'}
                    k={'common_terms_condition'}
                  />
                </a>
                <a
                  className={'cursor-pointer hover:underline hover:text-main-purple'}
                  target={'_blank'}
                  href={getPublicFileLink(privatePolicy?.path || '')}
                  rel={'noreferrer'}
                >
                  <Trans
                    ns={'common'}
                    k={'common_private_policy'}
                  />
                </a>
              </div>
            )}
            <div className={'text-sm font-light text-text-low-white'}>
              <Trans
                ns={'common'}
                k={'common_license'}
              />
            </div>
          </div>
          <div className={'flex flex-col gap-8'}>
            <div className={'font-medium text-base leading-[24px]'}>
              <Trans
                ns={'common'}
                k={'common_instruments'}
                format={'uppercase'}
              />
            </div>
            <div className={'flex flex-col gap-3 text-sm font-light text-text-low-white'}>
              <div
                className={'cursor-pointer hover:underline hover:text-main-purple'}
                onClick={() => router.push('/interview')}
              >
                <Trans
                  ns={'common'}
                  k={'common_interview'}
                />
              </div>
              <div
                className={'cursor-pointer hover:underline hover:text-main-purple'}
                onClick={() => router.push('/tests')}
              >
                <Trans
                  ns={'common'}
                  k={'common_tests'}
                />
              </div>
              <div
                className={'cursor-pointer hover:underline hover:text-main-purple'}
                onClick={() => router.push('/interview/resume-check')}
              >
                <Trans
                  ns={'common'}
                  k={'common_check_cv'}
                />
              </div>
              <div
                className={'cursor-pointer hover:underline hover:text-main-purple'}
                onClick={() => router.push('/interview/resume-create')}
              >
                <Trans
                  ns={'common'}
                  k={'common_create_cv'}
                />
              </div>
            </div>
          </div>
          <div className={'flex flex-col gap-8'}>
            <div className={'font-medium text-base leading-[24px]'}>
              <Trans
                ns={'common'}
                k={'common_contacts'}
                format={'uppercase'}
              />
            </div>
            <div className={'flex flex-col gap-3 text-sm font-light text-text-low-white'}>
              <div className={'flex gap-3 items-center'}>
                <Image
                  src={mail}
                  alt={'mail'}
                  width={32}
                  height={32}
                />
                <a
                  href={'mailto: support@gradiorai.ru'}
                  className={'hover:underline hover:text-main-purple'}
                >
                  Email: support@gradior.ru
                </a>
              </div>
              {/* <div className={'flex gap-3 items-center'}>
                <Image
                  src={telegramm}
                  alt={'telegramm'}
                  width={32}
                  height={32}
                />
                <a
                  href={'https://t.me/gradior_support'}
                  className={'hover:underline hover:text-main-purple'}
                >
                  Telegram: @gradior_support
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </footer>

      <MessengerPopup
        title={
          <Trans
            ns={'common'}
            k={'common_daily_advice'}
          />
        }
        delay={3000}
      />
    </AppLayout>
  );
};

export default Home;
