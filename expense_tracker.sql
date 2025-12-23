--
-- PostgreSQL database dump
--

-- Dumped from database version 14.16 (Homebrew)
-- Dumped by pg_dump version 14.16 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: AccountName; Type: TABLE; Schema: public; Owner: gopalroy
--

CREATE TABLE public."AccountName" (
    id text NOT NULL,
    "accountTypeId" text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."AccountName" OWNER TO gopalroy;

--
-- Name: AccountType; Type: TABLE; Schema: public; Owner: gopalroy
--

CREATE TABLE public."AccountType" (
    id text NOT NULL,
    "userId" text NOT NULL,
    type text NOT NULL
);


ALTER TABLE public."AccountType" OWNER TO gopalroy;

--
-- Name: NetworthEntry; Type: TABLE; Schema: public; Owner: gopalroy
--

CREATE TABLE public."NetworthEntry" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "accountType" text NOT NULL,
    "accountName" text NOT NULL,
    balance double precision NOT NULL,
    "snapshotDate" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."NetworthEntry" OWNER TO gopalroy;

--
-- Name: User; Type: TABLE; Schema: public; Owner: gopalroy
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    password text NOT NULL,
    city text,
    state text,
    pincode text,
    address text,
    dob timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO gopalroy;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: gopalroy
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO gopalroy;

--
-- Data for Name: AccountName; Type: TABLE DATA; Schema: public; Owner: gopalroy
--

COPY public."AccountName" (id, "accountTypeId", name) FROM stdin;
cmi1kq53l000brh5fcsua0b5n	cmi1kpz1q0009rh5fw5sus2rl	Kotak Bank
cmi1kqbqs000drh5fvk86x1k3	cmi1kpz1q0009rh5fw5sus2rl	HDFC Bank
cmi3z8cnu0003rh20zm4ylz9m	cmi1kpz1q0009rh5fw5sus2rl	Bank of baroda
cmi3z8hjf0005rh208n9dku7o	cmi1kpz1q0009rh5fw5sus2rl	Icici Bank
cmi3z8su90009rh203me74lad	cmi3z8mha0007rh204qp80q2z	HDFC Rupey
cmi3z962x000brh201hmfdh86	cmi3z8mha0007rh204qp80q2z	HDFC Visa Swiggy
cmi3z9g6d000drh20awordddw	cmi3z8mha0007rh204qp80q2z	HDFC Millenium
cmi3z9mgc000frh20kujicfsa	cmi3z8mha0007rh204qp80q2z	HDFC Pixel
cmi3z9uar000hrh20cy4gjntu	cmi3z8mha0007rh204qp80q2z	Icici Amazon
cmi3za2wq000jrh206lbm26ri	cmi3z8mha0007rh204qp80q2z	One card
cmi3za83g000lrh20no3lmd97	cmi3z8mha0007rh204qp80q2z	Axis Neo
cmi3zahjk000nrh200z88ilnq	cmi3z8mha0007rh204qp80q2z	SBI Simply Pay card
cmihn3glx0003rhdn5eghy1sv	cmihn2jg00001rhdnqdpksfa4	LIQUID FUND
cmihn4lx10007rhdn4n1y6vzs	cmihn2jg00001rhdnqdpksfa4	MUTUAL FUND
cmihn68wp000drhdntdod4ber	cmi1kpz1q0009rh5fw5sus2rl	BOB
cmihn9rdy000rrhdnyv73z0tv	cmi3z8mha0007rh204qp80q2z	AXIS Flifkart
cmihnabyi000vrhdnnyl0w2bh	cmi3z8mha0007rh204qp80q2z	IDFC FIRST BANK
cmihnc2ts0017rhdnemhghb5y	cmihnbbzg0013rhdnmeboj6sn	PEOPLE
cmihncsyy001brhdnu7qiuesa	cmihnaszd000zrhdnj2czudmv	PEOPLE
cmj28bcga0013rhj19dv4afnq	cmi1kpz1q0009rh5fw5sus2rl	AXIS BANK
cmj28x0ql000lrh5wp8hn8kd4	cmj28wi3q000jrh5w7ltvrza3	Pari
\.


--
-- Data for Name: AccountType; Type: TABLE DATA; Schema: public; Owner: gopalroy
--

COPY public."AccountType" (id, "userId", type) FROM stdin;
cmi1kpz1q0009rh5fw5sus2rl	cmi1fgepy0000rh1r1o0fsegu	Bank Accounts
cmi3z8mha0007rh204qp80q2z	cmi1fgepy0000rh1r1o0fsegu	Credit cards
cmihn2jg00001rhdnqdpksfa4	cmi1fgepy0000rh1r1o0fsegu	INVESTMENT
cmihnaszd000zrhdnj2czudmv	cmi1fgepy0000rh1r1o0fsegu	LENDED
cmihnbbzg0013rhdnmeboj6sn	cmi1fgepy0000rh1r1o0fsegu	BORROW
cmj28wi3q000jrh5w7ltvrza3	cmi1fgepy0000rh1r1o0fsegu	Wallet
\.


--
-- Data for Name: NetworthEntry; Type: TABLE DATA; Schema: public; Owner: gopalroy
--

COPY public."NetworthEntry" (id, "userId", "accountType", "accountName", balance, "snapshotDate", "createdAt") FROM stdin;
cmi1n7uh00001rh9o9ll63kaq	cmi1fgepy0000rh1r1o0fsegu	Bank	HDFC Savings	54000.5	2025-02-01 00:00:00	2025-11-16 11:39:15.587
cmizgnndv0000rhxz7ije5ftn	cmi1fgepy0000rh1r1o0fsegu	Bank Accounts	HDFC Bank	32328	2025-11-27 00:00:00	2025-11-27 16:21:40.465
cmj26nzsb0009rh5sse1nloev	cmi1fgepy0000rh1r1o0fsegu	Bank Accounts	HDFC Bank	45377	2025-08-24 00:00:00	2025-12-12 01:23:24.01
cmizgnndw0001rhxzyyih1bg6	cmi1fgepy0000rh1r1o0fsegu	Bank Accounts	Icici Bank	10308	2025-11-27 00:00:00	2025-11-27 16:21:53.124
cmizgnndw0002rhxzbsu3t073	cmi1fgepy0000rh1r1o0fsegu	Bank Accounts	BOB	2705	2025-11-27 00:00:00	2025-11-27 16:22:23.213
cmizgnndw0003rhxzprzsnpxb	cmi1fgepy0000rh1r1o0fsegu	Bank Accounts	Kotak Bank	162	2025-11-27 00:00:00	2025-11-27 16:22:34.984
cmihn5ek20009rhdnm19d295x	cmi1fgepy0000rh1r1o0fsegu	Bank Accounts	HDFC Bank	21082	2025-10-25 00:00:00	2025-11-27 16:21:40.465
cmihn5obo000brhdn7xvgzmta	cmi1fgepy0000rh1r1o0fsegu	Bank Accounts	Icici Bank	13026	2025-10-25 00:00:00	2025-11-27 16:21:53.124
cmihn6bjg000frhdnalmiblfl	cmi1fgepy0000rh1r1o0fsegu	Bank Accounts	BOB	2689	2025-10-25 00:00:00	2025-11-27 16:22:23.213
cmihn6kmg000hrhdnw975aye5	cmi1fgepy0000rh1r1o0fsegu	Bank Accounts	Kotak Bank	143	2025-10-25 00:00:00	2025-11-27 16:22:34.984
cmihn7qah000jrhdnth1eqziu	cmi1fgepy0000rh1r1o0fsegu	Credit cards	HDFC Visa Swiggy	-3991	2025-10-25 00:00:00	2025-11-27 16:23:28.985
cmihn876r000lrhdnr0v4m1th	cmi1fgepy0000rh1r1o0fsegu	Credit cards	HDFC Pixel	-229	2025-10-25 00:00:00	2025-11-27 16:23:50.875
cmihn9v3j000trhdng0ow37cw	cmi1fgepy0000rh1r1o0fsegu	Credit cards	AXIS Flifkart	-346	2025-10-25 00:00:00	2025-11-27 16:25:08.527
cmizgnndw0005rhxzf14mgcdk	cmi1fgepy0000rh1r1o0fsegu	Credit cards	HDFC Pixel	-2366	2025-11-27 00:00:00	2025-11-27 16:23:50.875
cmi41av440001rhni0z5ymtyi	cmi1fgepy0000rh1r1o0fsegu	INVESTMENT	MUTUAL FUND	211040	2025-10-25 00:00:00	2025-11-18 03:49:03.361
cmizgnndw000arhxzzxihoxya	cmi1fgepy0000rh1r1o0fsegu	Credit cards	Icici Amazon	-10824	2025-11-27 00:00:00	2025-12-10 03:03:43.493
cmihnbkpg0015rhdnxb6iafqz	cmi1fgepy0000rh1r1o0fsegu	BORROW	PEOPLE	-59968	2025-10-25 00:00:00	2025-11-27 16:26:28.372
cmizfarzl0003rh5rgz1gwsoe	cmi1fgepy0000rh1r1o0fsegu	Credit cards	HDFC Rupey	-275	2025-10-25 00:00:00	2025-12-10 03:01:45.393
cmizfdb4l0005rh5rlxatru3q	cmi1fgepy0000rh1r1o0fsegu	Credit cards	Icici Amazon	-4956	2025-10-25 00:00:00	2025-12-10 03:03:43.493
cmizfeyu40007rh5rdrquw6ig	cmi1fgepy0000rh1r1o0fsegu	LENDED	PEOPLE	11000	2025-10-25 00:00:00	2025-12-10 03:05:00.892
cmizf7col0001rh5rccitjg2z	cmi1fgepy0000rh1r1o0fsegu	INVESTMENT	LIQUID FUND	228110	2025-10-25 00:00:00	2025-12-10 02:59:05.586
cmj26avht0001rh5sbsiu92cd	cmi1fgepy0000rh1r1o0fsegu	Credit cards	Axis Neo	-3271	2025-11-01 00:00:00	2025-12-12 01:13:11.905
cmizgnndw0006rhxzshb9drqz	cmi1fgepy0000rh1r1o0fsegu	Credit cards	AXIS Flifkart	-236	2025-11-27 00:00:00	2025-11-27 16:25:08.527
cmj26cfxi0003rh5s4lqvct7k	cmi1fgepy0000rh1r1o0fsegu	Credit cards	IDFC FIRST BANK	-289	2025-11-01 00:00:00	2025-12-12 01:14:25.061
cmizgnndw000brhxzj05ybt5l	cmi1fgepy0000rh1r1o0fsegu	LENDED	PEOPLE	77650	2025-11-27 00:00:00	2025-12-10 03:05:00.892
cmizgnndw0008rhxz47ab7b8o	cmi1fgepy0000rh1r1o0fsegu	BORROW	PEOPLE	-2995	2025-11-27 00:00:00	2025-11-27 16:26:28.372
cmizgnndw0007rhxz3lo2ftg2	cmi1fgepy0000rh1r1o0fsegu	INVESTMENT	MUTUAL FUND	211042	2025-11-27 00:00:00	2025-11-18 03:49:03.361
cmizgnndw000crhxznn9pwkae	cmi1fgepy0000rh1r1o0fsegu	INVESTMENT	LIQUID FUND	180912	2025-11-27 00:00:00	2025-12-10 02:59:05.586
cmizgnndw0004rhxzfc3gmvqf	cmi1fgepy0000rh1r1o0fsegu	Credit cards	HDFC Visa Swiggy	-3931	2025-11-27 00:00:00	2025-11-27 16:23:28.985
cmj26n98t0005rh5sh77e2jdr	cmi1fgepy0000rh1r1o0fsegu	INVESTMENT	MUTUAL FUND	208145	2025-08-24 00:00:00	2025-12-12 01:22:49.61
cmj27dgv40001rhj1ms44cce1	cmi1fgepy0000rh1r1o0fsegu	INVESTMENT	MUTUAL FUND	226160	2025-07-27 00:00:00	2025-12-12 01:43:12.541
cmj26oshm000frh5skf1n0frx	cmi1fgepy0000rh1r1o0fsegu	Bank Accounts	Kotak Bank	122	2025-08-24 00:00:00	2025-12-12 01:24:01.211
cmj26pv0b000jrh5slcx1ta0g	cmi1fgepy0000rh1r1o0fsegu	Credit cards	HDFC Pixel	-1648	2025-08-24 00:00:00	2025-12-12 01:24:51.13
cmj26qokl000nrh5s41e3lgu9	cmi1fgepy0000rh1r1o0fsegu	LENDED	PEOPLE	17886	2025-08-24 00:00:00	2025-12-12 01:25:29.445
cmj26nm3d0007rh5s5p5n86um	cmi1fgepy0000rh1r1o0fsegu	INVESTMENT	LIQUID FUND	175130	2025-08-24 00:00:00	2025-12-12 01:23:06.264
cmj26oj6h000drh5sgdgfz8ek	cmi1fgepy0000rh1r1o0fsegu	Bank Accounts	BOB	2296	2025-08-24 00:00:00	2025-12-12 01:23:49.144
cmj26pd1d000hrh5ss7u6vbgy	cmi1fgepy0000rh1r1o0fsegu	Credit cards	HDFC Visa Swiggy	-4263	2025-08-24 00:00:00	2025-12-12 01:24:27.839
cmj26qd7b000lrh5sql1ziv09	cmi1fgepy0000rh1r1o0fsegu	Credit cards	Icici Amazon	-7110	2025-08-24 00:00:00	2025-12-12 01:25:14.711
cmj26r69j000prh5sb1tgc9pb	cmi1fgepy0000rh1r1o0fsegu	BORROW	PEOPLE	-60888	2025-08-24 00:00:00	2025-12-12 01:25:52.375
cmj26oa93000brh5s8bye5def	cmi1fgepy0000rh1r1o0fsegu	Bank Accounts	Icici Bank	2770	2025-08-24 00:00:00	2025-12-12 01:23:37.575
cmj27drh90003rhj1pnugsrhm	cmi1fgepy0000rh1r1o0fsegu	INVESTMENT	LIQUID FUND	118230	2025-07-27 00:00:00	2025-12-12 01:43:26.301
cmj27eb2x0005rhj1g0eb38e5	cmi1fgepy0000rh1r1o0fsegu	Bank Accounts	HDFC Bank	37007	2025-07-27 00:00:00	2025-12-12 01:43:51.705
cmj27f17m0007rhj1guhxf0jp	cmi1fgepy0000rh1r1o0fsegu	Bank Accounts	Icici Bank	15727	2025-07-27 00:00:00	2025-12-12 01:44:25.57
cmj27fywl0009rhj1iyv89j3o	cmi1fgepy0000rh1r1o0fsegu	Bank Accounts	Bank of baroda	3141	2025-07-27 00:00:00	2025-12-12 01:45:09.237
cmj27gf03000brhj1l9q8e3wk	cmi1fgepy0000rh1r1o0fsegu	Bank Accounts	Kotak Bank	102	2025-07-27 00:00:00	2025-12-12 01:45:30.099
cmj27ipes000lrhj17uqg4khj	cmi1fgepy0000rh1r1o0fsegu	Credit cards	Axis Neo	-1016	2025-07-27 00:00:00	2025-12-12 01:47:16.9
cmj27h88r000drhj1fdzp4psf	cmi1fgepy0000rh1r1o0fsegu	Credit cards	HDFC Visa Swiggy	-6079	2025-07-27 00:00:00	2025-12-12 01:46:07.994
cmj27hm3w000frhj1rzqlv46g	cmi1fgepy0000rh1r1o0fsegu	Credit cards	HDFC Rupey	-408	2025-07-27 00:00:00	2025-12-12 01:46:25.964
cmj27ic16000jrhj1wj89p19y	cmi1fgepy0000rh1r1o0fsegu	Credit cards	Icici Amazon	-4812	2025-07-27 00:00:00	2025-12-12 01:46:59.561
cmj27hypa000hrhj1ky115el5	cmi1fgepy0000rh1r1o0fsegu	Credit cards	HDFC Pixel	-2090	2025-07-27 00:00:00	2025-12-12 01:46:42.279
cmj27kde7000nrhj1ycm85hxh	cmi1fgepy0000rh1r1o0fsegu	Credit cards	AXIS Flifkart	-590	2025-07-01 00:00:00	2025-12-12 01:48:34.635
cmj27ks6s000prhj1y1c8daak	cmi1fgepy0000rh1r1o0fsegu	LENDED	PEOPLE	17886	2025-07-01 00:00:00	2025-12-12 01:48:53.812
cmj27l1jc000rrhj172vb9dhy	cmi1fgepy0000rh1r1o0fsegu	BORROW	PEOPLE	-60873	2025-07-01 00:00:00	2025-12-12 01:49:05.929
cmj27rn0z000trhj1e1dr8gc1	cmi1fgepy0000rh1r1o0fsegu	INVESTMENT	MUTUAL FUND	247489	2025-06-01 00:00:00	2025-12-12 01:54:13.713
cmj27s0ut000vrhj1m4ej72pn	cmi1fgepy0000rh1r1o0fsegu	INVESTMENT	LIQUID FUND	179153	2025-06-01 00:00:00	2025-12-12 01:54:31.637
cmj285che000xrhj11s3b9s63	cmi1fgepy0000rh1r1o0fsegu	Bank Accounts	HDFC Bank	9292	2025-06-01 00:00:00	2025-12-12 02:04:53.219
cmj2861f0000zrhj1mec0b5w0	cmi1fgepy0000rh1r1o0fsegu	Bank Accounts	Icici Bank	14895	2025-06-01 00:00:00	2025-12-12 02:05:25.548
cmj28azll0011rhj1sbqr60yj	cmi1fgepy0000rh1r1o0fsegu	Bank Accounts	Bank of baroda	2134	2025-06-01 00:00:00	2025-12-12 02:09:16.469
cmj28c4al0015rhj1vgo6e2ug	cmi1fgepy0000rh1r1o0fsegu	Bank Accounts	AXIS BANK	12416	2025-06-01 00:00:00	2025-12-12 02:10:09.192
cmj28e1fw0001rh5wro0mrtl4	cmi1fgepy0000rh1r1o0fsegu	Bank Accounts	Kotak Bank	63	2025-06-01 00:00:00	2025-12-12 02:11:38.829
cmj28h0g30003rh5w84iyougy	cmi1fgepy0000rh1r1o0fsegu	Credit cards	HDFC Visa Swiggy	-7460	2025-06-01 00:00:00	2025-12-12 02:13:57.507
cmj28jnd70005rh5wokzlcd9o	cmi1fgepy0000rh1r1o0fsegu	Credit cards	HDFC Rupey	-244	2025-06-01 00:00:00	2025-12-12 02:16:00.523
cmj28lx7e0007rh5wsfdmyhfk	cmi1fgepy0000rh1r1o0fsegu	Credit cards	Icici Amazon	-12957	2025-06-01 00:00:00	2025-12-12 02:17:46.564
cmj28s7ju0009rh5wjqer32b7	cmi1fgepy0000rh1r1o0fsegu	Credit cards	HDFC Pixel	-4912	2025-06-01 00:00:00	2025-12-12 02:22:39.928
cmj28u09y000brh5wyf2r75v8	cmi1fgepy0000rh1r1o0fsegu	Credit cards	SBI Simply Pay card	-34144	2025-06-09 00:00:00	2025-12-12 02:24:03.812
cmj28uwnk000drh5wlheajup4	cmi1fgepy0000rh1r1o0fsegu	Credit cards	Axis Neo	-1204	2025-06-09 00:00:00	2025-12-12 02:24:45.776
cmj28vjt3000frh5weblqa5cp	cmi1fgepy0000rh1r1o0fsegu	Credit cards	AXIS Flifkart	-932	2025-06-09 00:00:00	2025-12-12 02:25:15.783
cmj28w315000hrh5wdsmndsx4	cmi1fgepy0000rh1r1o0fsegu	Credit cards	One card	-568	2025-06-09 00:00:00	2025-12-12 02:25:40.696
cmj28xese000nrh5wesh5nzuu	cmi1fgepy0000rh1r1o0fsegu	Wallet	Pari	2000	2025-06-09 00:00:00	2025-12-12 02:26:42.589
cmj28xx0x000prh5wgaohy034	cmi1fgepy0000rh1r1o0fsegu	LENDED	PEOPLE	13886	2025-06-09 00:00:00	2025-12-12 02:27:06.225
cmj28yb91000rrh5wuxp937a3	cmi1fgepy0000rh1r1o0fsegu	BORROW	PEOPLE	-60573	2025-06-09 00:00:00	2025-12-12 02:27:24.661
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: gopalroy
--

COPY public."User" (id, name, email, phone, password, city, state, pincode, address, dob, "createdAt", "updatedAt") FROM stdin;
cmi1fgepy0000rh1r1o0fsegu	Gopal roy	gopalroy5397@gmail.com	9674661140	$2a$10$xOGp5KcancKfoB7hSYu8a.fPj4539S3tI/.PVT5/Lueu4UufCX8VS	kolkata	West bengal	700154	ef	1998-04-06 00:00:00	2025-11-16 08:01:58.15	2025-11-16 08:01:58.15
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: gopalroy
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
a99fe7fc-1fb3-490e-92f7-6f16575baf1a	aae5f7fd756e9de06492ad0b3cd74663a7f4bfc0f08745857566c7e7323e7fe0	2025-11-16 13:31:44.167541+05:30	20251116080144_init	\N	\N	2025-11-16 13:31:44.154771+05:30	1
01e52292-ae82-4607-9982-57b66ec5a43f	09e018b4766efc9a08a5d910028be5b142476fde64d2fcc3217fa89fd7921867	2025-11-16 17:05:11.491116+05:30	20251116113511_add_networth_entry_table	\N	\N	2025-11-16 17:05:11.485565+05:30	1
\.


--
-- Name: AccountName AccountName_pkey; Type: CONSTRAINT; Schema: public; Owner: gopalroy
--

ALTER TABLE ONLY public."AccountName"
    ADD CONSTRAINT "AccountName_pkey" PRIMARY KEY (id);


--
-- Name: AccountType AccountType_pkey; Type: CONSTRAINT; Schema: public; Owner: gopalroy
--

ALTER TABLE ONLY public."AccountType"
    ADD CONSTRAINT "AccountType_pkey" PRIMARY KEY (id);


--
-- Name: NetworthEntry NetworthEntry_pkey; Type: CONSTRAINT; Schema: public; Owner: gopalroy
--

ALTER TABLE ONLY public."NetworthEntry"
    ADD CONSTRAINT "NetworthEntry_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: gopalroy
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: gopalroy
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: AccountName_accountTypeId_name_key; Type: INDEX; Schema: public; Owner: gopalroy
--

CREATE UNIQUE INDEX "AccountName_accountTypeId_name_key" ON public."AccountName" USING btree ("accountTypeId", name);


--
-- Name: AccountType_userId_type_key; Type: INDEX; Schema: public; Owner: gopalroy
--

CREATE UNIQUE INDEX "AccountType_userId_type_key" ON public."AccountType" USING btree ("userId", type);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: gopalroy
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_phone_key; Type: INDEX; Schema: public; Owner: gopalroy
--

CREATE UNIQUE INDEX "User_phone_key" ON public."User" USING btree (phone);


--
-- Name: AccountName AccountName_accountTypeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gopalroy
--

ALTER TABLE ONLY public."AccountName"
    ADD CONSTRAINT "AccountName_accountTypeId_fkey" FOREIGN KEY ("accountTypeId") REFERENCES public."AccountType"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AccountType AccountType_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gopalroy
--

ALTER TABLE ONLY public."AccountType"
    ADD CONSTRAINT "AccountType_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: NetworthEntry NetworthEntry_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gopalroy
--

ALTER TABLE ONLY public."NetworthEntry"
    ADD CONSTRAINT "NetworthEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

