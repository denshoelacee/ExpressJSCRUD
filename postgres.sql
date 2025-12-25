--
-- PostgreSQL database dump
--

\restrict xIiMgobSkWG5IK291U1PQDzrKN9jm9r1Wk2t5U8JQb0NeKWayQpRlubJKkNkAcu

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2025-12-20 01:21:31

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 221 (class 1259 OID 16446)
-- Name: todos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.todos (
    todo_id integer CONSTRAINT todo_todo_id_not_null NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    status text NOT NULL,
    due_date text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    user_id integer
);


ALTER TABLE public.todos OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16474)
-- Name: todos_todo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.todos ALTER COLUMN todo_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.todos_todo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 16415)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    first_name character varying(25) CONSTRAINT users_firt_name_not_null NOT NULL,
    last_name character varying(25) NOT NULL,
    email character varying(50) NOT NULL,
    password text NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16414)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 5028 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 4861 (class 2604 OID 16418)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 5021 (class 0 OID 16446)
-- Dependencies: 221
-- Data for Name: todos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.todos (todo_id, title, description, status, due_date, created_at, updated_at, user_id) FROM stdin;
85	testingg	testing	pending	2025-12-27	2025-12-20 00:39:32.631133+08	2025-12-20 00:39:32.631133+08	50
\.


--
-- TOC entry 5020 (class 0 OID 16415)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, first_name, last_name, email, password, created_at) FROM stdin;
50	test	test2	test@gmail.com	$2b$10$eftaFNeUtBzQjWoU/X.AFuW8Cl7aereVbCsLa6jvTZnFkTDlQtTvK	2025-12-20 00:09:30.779282
\.


--
-- TOC entry 5029 (class 0 OID 0)
-- Dependencies: 222
-- Name: todos_todo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.todos_todo_id_seq', 85, true);


--
-- TOC entry 5030 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 50, true);


--
-- TOC entry 4870 (class 2606 OID 16455)
-- Name: todos todo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todos
    ADD CONSTRAINT todo_pkey PRIMARY KEY (todo_id);


--
-- TOC entry 4866 (class 2606 OID 16428)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4868 (class 2606 OID 16426)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4871 (class 2606 OID 16469)
-- Name: todos user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todos
    ADD CONSTRAINT user_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) NOT VALID;


-- Completed on 2025-12-20 01:21:32

--
-- PostgreSQL database dump complete
--

\unrestrict xIiMgobSkWG5IK291U1PQDzrKN9jm9r1Wk2t5U8JQb0NeKWayQpRlubJKkNkAcu

