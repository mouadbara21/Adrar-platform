PGDMP  3                    }           gestion_des_refuges    17.2    17.2 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16394    gestion_des_refuges    DATABASE     �   CREATE DATABASE gestion_des_refuges WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_France.1252';
 #   DROP DATABASE gestion_des_refuges;
                     postgres    false            �            1259    41578    avis_randonnee    TABLE     	  CREATE TABLE public.avis_randonnee (
    id_avis integer NOT NULL,
    user_id integer,
    id_randonnee integer,
    note integer,
    commentaire text,
    date_avis date NOT NULL,
    CONSTRAINT avis_randonnee_note_check CHECK (((note >= 1) AND (note <= 5)))
);
 "   DROP TABLE public.avis_randonnee;
       public         heap r       postgres    false            �            1259    41577    avis_randonnee_id_avis_seq    SEQUENCE     �   CREATE SEQUENCE public.avis_randonnee_id_avis_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.avis_randonnee_id_avis_seq;
       public               postgres    false    253            �           0    0    avis_randonnee_id_avis_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.avis_randonnee_id_avis_seq OWNED BY public.avis_randonnee.id_avis;
          public               postgres    false    252            �            1259    16427    client    TABLE       CREATE TABLE public.client (
    id_client integer NOT NULL,
    nom character varying(255) NOT NULL,
    prenom character varying(255) NOT NULL,
    email character varying(255),
    telephone character varying(50),
    type_client character varying(50)
);
    DROP TABLE public.client;
       public         heap r       postgres    false            �            1259    16426    client_id_client_seq    SEQUENCE     �   CREATE SEQUENCE public.client_id_client_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.client_id_client_seq;
       public               postgres    false    223            �           0    0    client_id_client_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.client_id_client_seq OWNED BY public.client.id_client;
          public               postgres    false    222            �            1259    16453 
   equipement    TABLE     p   CREATE TABLE public.equipement (
    id_equipement integer NOT NULL,
    nom character varying(255) NOT NULL
);
    DROP TABLE public.equipement;
       public         heap r       postgres    false            �            1259    16452    equipement_id_equipement_seq    SEQUENCE     �   CREATE SEQUENCE public.equipement_id_equipement_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.equipement_id_equipement_seq;
       public               postgres    false    227            �           0    0    equipement_id_equipement_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.equipement_id_equipement_seq OWNED BY public.equipement.id_equipement;
          public               postgres    false    226            �            1259    16483    fournir    TABLE     �   CREATE TABLE public.fournir (
    id_guide integer NOT NULL,
    id_refuge integer NOT NULL,
    id_guide_profile_easyhike integer
);
    DROP TABLE public.fournir;
       public         heap r       postgres    false            �            1259    16475    guide    TABLE     �   CREATE TABLE public.guide (
    id_guide integer NOT NULL,
    nom character varying(255) NOT NULL,
    prenom character varying(255) NOT NULL,
    experience integer NOT NULL,
    contact_guide character varying(50),
    prix_par_jour integer
);
    DROP TABLE public.guide;
       public         heap r       postgres    false            �            1259    16474    guide_id_guide_seq    SEQUENCE     �   CREATE SEQUENCE public.guide_id_guide_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.guide_id_guide_seq;
       public               postgres    false    230            �           0    0    guide_id_guide_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.guide_id_guide_seq OWNED BY public.guide.id_guide;
          public               postgres    false    229            �            1259    41438    guide_profile    TABLE     �   CREATE TABLE public.guide_profile (
    id_guide integer NOT NULL,
    user_id integer,
    experience integer NOT NULL,
    contact_guide character varying(50) NOT NULL
);
 !   DROP TABLE public.guide_profile;
       public         heap r       postgres    false            �            1259    41437    guide_profile_id_guide_seq    SEQUENCE     �   CREATE SEQUENCE public.guide_profile_id_guide_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.guide_profile_id_guide_seq;
       public               postgres    false    239            �           0    0    guide_profile_id_guide_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.guide_profile_id_guide_seq OWNED BY public.guide_profile.id_guide;
          public               postgres    false    238            �            1259    32823    guider    TABLE     |   CREATE TABLE public.guider (
    id_guide integer NOT NULL,
    id_client integer NOT NULL,
    user_id_easyhike integer
);
    DROP TABLE public.guider;
       public         heap r       postgres    false            �            1259    41457    parc_national    TABLE     �   CREATE TABLE public.parc_national (
    id_parc integer NOT NULL,
    nom character varying(255) NOT NULL,
    localisation character varying(255),
    description text,
    image_url character varying(255)
);
 !   DROP TABLE public.parc_national;
       public         heap r       postgres    false            �            1259    41456    parc_national_id_parc_seq    SEQUENCE     �   CREATE SEQUENCE public.parc_national_id_parc_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.parc_national_id_parc_seq;
       public               postgres    false    241            �           0    0    parc_national_id_parc_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.parc_national_id_parc_seq OWNED BY public.parc_national.id_parc;
          public               postgres    false    240            �            1259    16459    posseder    TABLE     e   CREATE TABLE public.posseder (
    id_equipement integer NOT NULL,
    id_refuge integer NOT NULL
);
    DROP TABLE public.posseder;
       public         heap r       postgres    false            �            1259    41466 	   randonnee    TABLE     �  CREATE TABLE public.randonnee (
    id_randonnee integer NOT NULL,
    nom character varying(255) NOT NULL,
    distance numeric NOT NULL,
    denivele_positif numeric NOT NULL,
    duree_estimee integer NOT NULL,
    difficulte character varying(50),
    description text,
    localisation_de_depart character varying(255),
    localisation_darrive character varying(255),
    id_parc integer,
    image_url character varying(255)
);
    DROP TABLE public.randonnee;
       public         heap r       postgres    false            �            1259    41510    randonnee_guide    TABLE     �   CREATE TABLE public.randonnee_guide (
    id_randonnee integer NOT NULL,
    id_guide integer NOT NULL,
    disponibilite date NOT NULL
);
 #   DROP TABLE public.randonnee_guide;
       public         heap r       postgres    false            �            1259    41465    randonnee_id_randonnee_seq    SEQUENCE     �   CREATE SEQUENCE public.randonnee_id_randonnee_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.randonnee_id_randonnee_seq;
       public               postgres    false    243            �           0    0    randonnee_id_randonnee_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.randonnee_id_randonnee_seq OWNED BY public.randonnee.id_randonnee;
          public               postgres    false    242            �            1259    41495    randonnee_refuge    TABLE     l   CREATE TABLE public.randonnee_refuge (
    id_randonnee integer NOT NULL,
    id_refuge integer NOT NULL
);
 $   DROP TABLE public.randonnee_refuge;
       public         heap r       postgres    false            �            1259    41480    randonnee_sommet    TABLE     �   CREATE TABLE public.randonnee_sommet (
    id_randonnee integer NOT NULL,
    id_sommet integer NOT NULL,
    ordre_visite integer
);
 $   DROP TABLE public.randonnee_sommet;
       public         heap r       postgres    false            �            1259    16396    refuge    TABLE     �  CREATE TABLE public.refuge (
    id_refuge integer NOT NULL,
    nom character varying(255) NOT NULL,
    localisation character varying(255) NOT NULL,
    capacite integer NOT NULL,
    contact character varying(50),
    altitude integer NOT NULL,
    gardien character varying(255),
    description text,
    prix_avec_restauration integer,
    prix_sans_restauration integer,
    responsable_id integer
);
    DROP TABLE public.refuge;
       public         heap r       postgres    false            �            1259    16395    refuge_id_refuge_seq    SEQUENCE     �   CREATE SEQUENCE public.refuge_id_refuge_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.refuge_id_refuge_seq;
       public               postgres    false    218            �           0    0    refuge_id_refuge_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.refuge_id_refuge_seq OWNED BY public.refuge.id_refuge;
          public               postgres    false    217            �            1259    16411    relier    TABLE     `   CREATE TABLE public.relier (
    id_refuge integer NOT NULL,
    id_service integer NOT NULL
);
    DROP TABLE public.relier;
       public         heap r       postgres    false            �            1259    16505    relier_sommet_refuge    TABLE     m   CREATE TABLE public.relier_sommet_refuge (
    id_sommet integer NOT NULL,
    id_refuge integer NOT NULL
);
 (   DROP TABLE public.relier_sommet_refuge;
       public         heap r       postgres    false            �            1259    16436    reservation    TABLE     F  CREATE TABLE public.reservation (
    id_reservation integer NOT NULL,
    date_reservation date NOT NULL,
    date_debut date NOT NULL,
    date_fin date,
    nombre_personne integer,
    etat_reservation character varying,
    id_client integer,
    id_refuge integer,
    avec_restauration boolean,
    id_guide integer
);
    DROP TABLE public.reservation;
       public         heap r       postgres    false            �            1259    41544    reservation_guide    TABLE     �  CREATE TABLE public.reservation_guide (
    id_reservation_guide integer NOT NULL,
    date_reservation date NOT NULL,
    date_debut date NOT NULL,
    date_fin date NOT NULL,
    etat_reservation character varying(50) NOT NULL,
    user_id integer,
    id_guide integer,
    CONSTRAINT reservation_guide_etat_reservation_check CHECK (((etat_reservation)::text = ANY ((ARRAY['confirmée'::character varying, 'en attente'::character varying, 'annulée'::character varying])::text[])))
);
 %   DROP TABLE public.reservation_guide;
       public         heap r       postgres    false            �            1259    41543 *   reservation_guide_id_reservation_guide_seq    SEQUENCE     �   CREATE SEQUENCE public.reservation_guide_id_reservation_guide_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 A   DROP SEQUENCE public.reservation_guide_id_reservation_guide_seq;
       public               postgres    false    250            �           0    0 *   reservation_guide_id_reservation_guide_seq    SEQUENCE OWNED BY     y   ALTER SEQUENCE public.reservation_guide_id_reservation_guide_seq OWNED BY public.reservation_guide.id_reservation_guide;
          public               postgres    false    249            �            1259    16435    reservation_id_reservation_seq    SEQUENCE     �   CREATE SEQUENCE public.reservation_id_reservation_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.reservation_id_reservation_seq;
       public               postgres    false    225            �           0    0    reservation_id_reservation_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.reservation_id_reservation_seq OWNED BY public.reservation.id_reservation;
          public               postgres    false    224            �            1259    41526    reservation_refuge    TABLE       CREATE TABLE public.reservation_refuge (
    id_reservation integer NOT NULL,
    date_reservation date NOT NULL,
    date_debut date NOT NULL,
    date_fin date NOT NULL,
    nombre_personne integer NOT NULL,
    etat_reservation character varying(50) NOT NULL,
    user_id integer,
    id_refuge integer,
    CONSTRAINT reservation_refuge_etat_reservation_check CHECK (((etat_reservation)::text = ANY ((ARRAY['confirmée'::character varying, 'en attente'::character varying, 'annulée'::character varying])::text[])))
);
 &   DROP TABLE public.reservation_refuge;
       public         heap r       postgres    false            �            1259    41525 %   reservation_refuge_id_reservation_seq    SEQUENCE     �   CREATE SEQUENCE public.reservation_refuge_id_reservation_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public.reservation_refuge_id_reservation_seq;
       public               postgres    false    248            �           0    0 %   reservation_refuge_id_reservation_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public.reservation_refuge_id_reservation_seq OWNED BY public.reservation_refuge.id_reservation;
          public               postgres    false    247            �            1259    41561    sauvegarde_randonnee    TABLE     U  CREATE TABLE public.sauvegarde_randonnee (
    user_id integer NOT NULL,
    id_randonnee integer NOT NULL,
    type_sauvegarde character varying(50) NOT NULL,
    CONSTRAINT sauvegarde_randonnee_type_sauvegarde_check CHECK (((type_sauvegarde)::text = ANY ((ARRAY['favori'::character varying, 'want_to_go'::character varying])::text[])))
);
 (   DROP TABLE public.sauvegarde_randonnee;
       public         heap r       postgres    false            �            1259    16405    service    TABLE     r   CREATE TABLE public.service (
    id_service integer NOT NULL,
    nom_service character varying(255) NOT NULL
);
    DROP TABLE public.service;
       public         heap r       postgres    false            �            1259    16404    service_id_service_seq    SEQUENCE     �   CREATE SEQUENCE public.service_id_service_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.service_id_service_seq;
       public               postgres    false    220            �           0    0    service_id_service_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.service_id_service_seq OWNED BY public.service.id_service;
          public               postgres    false    219            �            1259    16499    sommet    TABLE     �   CREATE TABLE public.sommet (
    id_sommet integer NOT NULL,
    nom character varying(255) NOT NULL,
    altitude integer NOT NULL,
    temps integer NOT NULL,
    difficulte character varying(50) NOT NULL
);
    DROP TABLE public.sommet;
       public         heap r       postgres    false            �            1259    16498    sommet_id_sommet_seq    SEQUENCE     �   CREATE SEQUENCE public.sommet_id_sommet_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.sommet_id_sommet_seq;
       public               postgres    false    233            �           0    0    sommet_id_sommet_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.sommet_id_sommet_seq OWNED BY public.sommet.id_sommet;
          public               postgres    false    232            �            1259    41424    utilisateur    TABLE     -  CREATE TABLE public.utilisateur (
    id_user integer NOT NULL,
    nom character varying(255) NOT NULL,
    prenom character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    telephone character varying(50),
    role character varying(50) NOT NULL,
    username character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    CONSTRAINT utilisateur_role_check CHECK (((role)::text = ANY ((ARRAY['randonneur'::character varying, 'guide'::character varying, 'responsable_refuge'::character varying])::text[])))
);
    DROP TABLE public.utilisateur;
       public         heap r       postgres    false            �            1259    41423    utilisateur_id_user_seq    SEQUENCE     �   CREATE SEQUENCE public.utilisateur_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.utilisateur_id_user_seq;
       public               postgres    false    237            �           0    0    utilisateur_id_user_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.utilisateur_id_user_seq OWNED BY public.utilisateur.id_user;
          public               postgres    false    236            �           2604    41581    avis_randonnee id_avis    DEFAULT     �   ALTER TABLE ONLY public.avis_randonnee ALTER COLUMN id_avis SET DEFAULT nextval('public.avis_randonnee_id_avis_seq'::regclass);
 E   ALTER TABLE public.avis_randonnee ALTER COLUMN id_avis DROP DEFAULT;
       public               postgres    false    253    252    253            �           2604    16430    client id_client    DEFAULT     t   ALTER TABLE ONLY public.client ALTER COLUMN id_client SET DEFAULT nextval('public.client_id_client_seq'::regclass);
 ?   ALTER TABLE public.client ALTER COLUMN id_client DROP DEFAULT;
       public               postgres    false    223    222    223            �           2604    16456    equipement id_equipement    DEFAULT     �   ALTER TABLE ONLY public.equipement ALTER COLUMN id_equipement SET DEFAULT nextval('public.equipement_id_equipement_seq'::regclass);
 G   ALTER TABLE public.equipement ALTER COLUMN id_equipement DROP DEFAULT;
       public               postgres    false    227    226    227            �           2604    16478    guide id_guide    DEFAULT     p   ALTER TABLE ONLY public.guide ALTER COLUMN id_guide SET DEFAULT nextval('public.guide_id_guide_seq'::regclass);
 =   ALTER TABLE public.guide ALTER COLUMN id_guide DROP DEFAULT;
       public               postgres    false    230    229    230            �           2604    41441    guide_profile id_guide    DEFAULT     �   ALTER TABLE ONLY public.guide_profile ALTER COLUMN id_guide SET DEFAULT nextval('public.guide_profile_id_guide_seq'::regclass);
 E   ALTER TABLE public.guide_profile ALTER COLUMN id_guide DROP DEFAULT;
       public               postgres    false    239    238    239            �           2604    41460    parc_national id_parc    DEFAULT     ~   ALTER TABLE ONLY public.parc_national ALTER COLUMN id_parc SET DEFAULT nextval('public.parc_national_id_parc_seq'::regclass);
 D   ALTER TABLE public.parc_national ALTER COLUMN id_parc DROP DEFAULT;
       public               postgres    false    241    240    241            �           2604    41469    randonnee id_randonnee    DEFAULT     �   ALTER TABLE ONLY public.randonnee ALTER COLUMN id_randonnee SET DEFAULT nextval('public.randonnee_id_randonnee_seq'::regclass);
 E   ALTER TABLE public.randonnee ALTER COLUMN id_randonnee DROP DEFAULT;
       public               postgres    false    243    242    243            �           2604    16399    refuge id_refuge    DEFAULT     t   ALTER TABLE ONLY public.refuge ALTER COLUMN id_refuge SET DEFAULT nextval('public.refuge_id_refuge_seq'::regclass);
 ?   ALTER TABLE public.refuge ALTER COLUMN id_refuge DROP DEFAULT;
       public               postgres    false    217    218    218            �           2604    16439    reservation id_reservation    DEFAULT     �   ALTER TABLE ONLY public.reservation ALTER COLUMN id_reservation SET DEFAULT nextval('public.reservation_id_reservation_seq'::regclass);
 I   ALTER TABLE public.reservation ALTER COLUMN id_reservation DROP DEFAULT;
       public               postgres    false    225    224    225            �           2604    41547 &   reservation_guide id_reservation_guide    DEFAULT     �   ALTER TABLE ONLY public.reservation_guide ALTER COLUMN id_reservation_guide SET DEFAULT nextval('public.reservation_guide_id_reservation_guide_seq'::regclass);
 U   ALTER TABLE public.reservation_guide ALTER COLUMN id_reservation_guide DROP DEFAULT;
       public               postgres    false    249    250    250            �           2604    41529 !   reservation_refuge id_reservation    DEFAULT     �   ALTER TABLE ONLY public.reservation_refuge ALTER COLUMN id_reservation SET DEFAULT nextval('public.reservation_refuge_id_reservation_seq'::regclass);
 P   ALTER TABLE public.reservation_refuge ALTER COLUMN id_reservation DROP DEFAULT;
       public               postgres    false    247    248    248            �           2604    16408    service id_service    DEFAULT     x   ALTER TABLE ONLY public.service ALTER COLUMN id_service SET DEFAULT nextval('public.service_id_service_seq'::regclass);
 A   ALTER TABLE public.service ALTER COLUMN id_service DROP DEFAULT;
       public               postgres    false    219    220    220            �           2604    16502    sommet id_sommet    DEFAULT     t   ALTER TABLE ONLY public.sommet ALTER COLUMN id_sommet SET DEFAULT nextval('public.sommet_id_sommet_seq'::regclass);
 ?   ALTER TABLE public.sommet ALTER COLUMN id_sommet DROP DEFAULT;
       public               postgres    false    233    232    233            �           2604    41427    utilisateur id_user    DEFAULT     z   ALTER TABLE ONLY public.utilisateur ALTER COLUMN id_user SET DEFAULT nextval('public.utilisateur_id_user_seq'::regclass);
 B   ALTER TABLE public.utilisateur ALTER COLUMN id_user DROP DEFAULT;
       public               postgres    false    237    236    237            �          0    41578    avis_randonnee 
   TABLE DATA           f   COPY public.avis_randonnee (id_avis, user_id, id_randonnee, note, commentaire, date_avis) FROM stdin;
    public               postgres    false    253   T�       �          0    16427    client 
   TABLE DATA           W   COPY public.client (id_client, nom, prenom, email, telephone, type_client) FROM stdin;
    public               postgres    false    223   q�       �          0    16453 
   equipement 
   TABLE DATA           8   COPY public.equipement (id_equipement, nom) FROM stdin;
    public               postgres    false    227   ��       �          0    16483    fournir 
   TABLE DATA           Q   COPY public.fournir (id_guide, id_refuge, id_guide_profile_easyhike) FROM stdin;
    public               postgres    false    231   �       �          0    16475    guide 
   TABLE DATA           `   COPY public.guide (id_guide, nom, prenom, experience, contact_guide, prix_par_jour) FROM stdin;
    public               postgres    false    230   ��       �          0    41438    guide_profile 
   TABLE DATA           U   COPY public.guide_profile (id_guide, user_id, experience, contact_guide) FROM stdin;
    public               postgres    false    239   ��       �          0    32823    guider 
   TABLE DATA           G   COPY public.guider (id_guide, id_client, user_id_easyhike) FROM stdin;
    public               postgres    false    235   e�       �          0    41457    parc_national 
   TABLE DATA           [   COPY public.parc_national (id_parc, nom, localisation, description, image_url) FROM stdin;
    public               postgres    false    241   ��       �          0    16459    posseder 
   TABLE DATA           <   COPY public.posseder (id_equipement, id_refuge) FROM stdin;
    public               postgres    false    228   ��       �          0    41466 	   randonnee 
   TABLE DATA           �   COPY public.randonnee (id_randonnee, nom, distance, denivele_positif, duree_estimee, difficulte, description, localisation_de_depart, localisation_darrive, id_parc, image_url) FROM stdin;
    public               postgres    false    243   +�       �          0    41510    randonnee_guide 
   TABLE DATA           P   COPY public.randonnee_guide (id_randonnee, id_guide, disponibilite) FROM stdin;
    public               postgres    false    246   #      �          0    41495    randonnee_refuge 
   TABLE DATA           C   COPY public.randonnee_refuge (id_randonnee, id_refuge) FROM stdin;
    public               postgres    false    245   M      �          0    41480    randonnee_sommet 
   TABLE DATA           Q   COPY public.randonnee_sommet (id_randonnee, id_sommet, ordre_visite) FROM stdin;
    public               postgres    false    244   �      �          0    16396    refuge 
   TABLE DATA           �   COPY public.refuge (id_refuge, nom, localisation, capacite, contact, altitude, gardien, description, prix_avec_restauration, prix_sans_restauration, responsable_id) FROM stdin;
    public               postgres    false    218         �          0    16411    relier 
   TABLE DATA           7   COPY public.relier (id_refuge, id_service) FROM stdin;
    public               postgres    false    221   �	      �          0    16505    relier_sommet_refuge 
   TABLE DATA           D   COPY public.relier_sommet_refuge (id_sommet, id_refuge) FROM stdin;
    public               postgres    false    234   i
      �          0    16436    reservation 
   TABLE DATA           �   COPY public.reservation (id_reservation, date_reservation, date_debut, date_fin, nombre_personne, etat_reservation, id_client, id_refuge, avec_restauration, id_guide) FROM stdin;
    public               postgres    false    225   �
      �          0    41544    reservation_guide 
   TABLE DATA           �   COPY public.reservation_guide (id_reservation_guide, date_reservation, date_debut, date_fin, etat_reservation, user_id, id_guide) FROM stdin;
    public               postgres    false    250   �      �          0    41526    reservation_refuge 
   TABLE DATA           �   COPY public.reservation_refuge (id_reservation, date_reservation, date_debut, date_fin, nombre_personne, etat_reservation, user_id, id_refuge) FROM stdin;
    public               postgres    false    248         �          0    41561    sauvegarde_randonnee 
   TABLE DATA           V   COPY public.sauvegarde_randonnee (user_id, id_randonnee, type_sauvegarde) FROM stdin;
    public               postgres    false    251   3      �          0    16405    service 
   TABLE DATA           :   COPY public.service (id_service, nom_service) FROM stdin;
    public               postgres    false    220   P      �          0    16499    sommet 
   TABLE DATA           M   COPY public.sommet (id_sommet, nom, altitude, temps, difficulte) FROM stdin;
    public               postgres    false    233   �      �          0    41424    utilisateur 
   TABLE DATA           l   COPY public.utilisateur (id_user, nom, prenom, email, telephone, role, username, password_hash) FROM stdin;
    public               postgres    false    237   O      �           0    0    avis_randonnee_id_avis_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.avis_randonnee_id_avis_seq', 1, false);
          public               postgres    false    252            �           0    0    client_id_client_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.client_id_client_seq', 25, true);
          public               postgres    false    222            �           0    0    equipement_id_equipement_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.equipement_id_equipement_seq', 5, true);
          public               postgres    false    226            �           0    0    guide_id_guide_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.guide_id_guide_seq', 23, true);
          public               postgres    false    229            �           0    0    guide_profile_id_guide_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.guide_profile_id_guide_seq', 1, false);
          public               postgres    false    238            �           0    0    parc_national_id_parc_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.parc_national_id_parc_seq', 1, false);
          public               postgres    false    240            �           0    0    randonnee_id_randonnee_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.randonnee_id_randonnee_seq', 1, false);
          public               postgres    false    242            �           0    0    refuge_id_refuge_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.refuge_id_refuge_seq', 11, true);
          public               postgres    false    217            �           0    0 *   reservation_guide_id_reservation_guide_seq    SEQUENCE SET     Y   SELECT pg_catalog.setval('public.reservation_guide_id_reservation_guide_seq', 1, false);
          public               postgres    false    249            �           0    0    reservation_id_reservation_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.reservation_id_reservation_seq', 45, true);
          public               postgres    false    224            �           0    0 %   reservation_refuge_id_reservation_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public.reservation_refuge_id_reservation_seq', 1, false);
          public               postgres    false    247            �           0    0    service_id_service_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.service_id_service_seq', 4, true);
          public               postgres    false    219            �           0    0    sommet_id_sommet_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.sommet_id_sommet_seq', 46, true);
          public               postgres    false    232            �           0    0    utilisateur_id_user_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.utilisateur_id_user_seq', 124, true);
          public               postgres    false    236                       2606    41586 "   avis_randonnee avis_randonnee_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.avis_randonnee
    ADD CONSTRAINT avis_randonnee_pkey PRIMARY KEY (id_avis);
 L   ALTER TABLE ONLY public.avis_randonnee DROP CONSTRAINT avis_randonnee_pkey;
       public                 postgres    false    253            �           2606    16434    client client_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (id_client);
 <   ALTER TABLE ONLY public.client DROP CONSTRAINT client_pkey;
       public                 postgres    false    223            �           2606    16458    equipement equipement_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.equipement
    ADD CONSTRAINT equipement_pkey PRIMARY KEY (id_equipement);
 D   ALTER TABLE ONLY public.equipement DROP CONSTRAINT equipement_pkey;
       public                 postgres    false    227            �           2606    16487    fournir fournir_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.fournir
    ADD CONSTRAINT fournir_pkey PRIMARY KEY (id_guide, id_refuge);
 >   ALTER TABLE ONLY public.fournir DROP CONSTRAINT fournir_pkey;
       public                 postgres    false    231    231            �           2606    16482    guide guide_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.guide
    ADD CONSTRAINT guide_pkey PRIMARY KEY (id_guide);
 :   ALTER TABLE ONLY public.guide DROP CONSTRAINT guide_pkey;
       public                 postgres    false    230            �           2606    41443     guide_profile guide_profile_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.guide_profile
    ADD CONSTRAINT guide_profile_pkey PRIMARY KEY (id_guide);
 J   ALTER TABLE ONLY public.guide_profile DROP CONSTRAINT guide_profile_pkey;
       public                 postgres    false    239            �           2606    41445 '   guide_profile guide_profile_user_id_key 
   CONSTRAINT     e   ALTER TABLE ONLY public.guide_profile
    ADD CONSTRAINT guide_profile_user_id_key UNIQUE (user_id);
 Q   ALTER TABLE ONLY public.guide_profile DROP CONSTRAINT guide_profile_user_id_key;
       public                 postgres    false    239            �           2606    32827    guider guider_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.guider
    ADD CONSTRAINT guider_pkey PRIMARY KEY (id_guide, id_client);
 <   ALTER TABLE ONLY public.guider DROP CONSTRAINT guider_pkey;
       public                 postgres    false    235    235            �           2606    41464     parc_national parc_national_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.parc_national
    ADD CONSTRAINT parc_national_pkey PRIMARY KEY (id_parc);
 J   ALTER TABLE ONLY public.parc_national DROP CONSTRAINT parc_national_pkey;
       public                 postgres    false    241            �           2606    16463    posseder posseder_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.posseder
    ADD CONSTRAINT posseder_pkey PRIMARY KEY (id_equipement, id_refuge);
 @   ALTER TABLE ONLY public.posseder DROP CONSTRAINT posseder_pkey;
       public                 postgres    false    228    228            �           2606    41514 $   randonnee_guide randonnee_guide_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.randonnee_guide
    ADD CONSTRAINT randonnee_guide_pkey PRIMARY KEY (id_randonnee, id_guide, disponibilite);
 N   ALTER TABLE ONLY public.randonnee_guide DROP CONSTRAINT randonnee_guide_pkey;
       public                 postgres    false    246    246    246            �           2606    41474    randonnee randonnee_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.randonnee
    ADD CONSTRAINT randonnee_pkey PRIMARY KEY (id_randonnee);
 B   ALTER TABLE ONLY public.randonnee DROP CONSTRAINT randonnee_pkey;
       public                 postgres    false    243            �           2606    41499 &   randonnee_refuge randonnee_refuge_pkey 
   CONSTRAINT     y   ALTER TABLE ONLY public.randonnee_refuge
    ADD CONSTRAINT randonnee_refuge_pkey PRIMARY KEY (id_randonnee, id_refuge);
 P   ALTER TABLE ONLY public.randonnee_refuge DROP CONSTRAINT randonnee_refuge_pkey;
       public                 postgres    false    245    245            �           2606    41484 &   randonnee_sommet randonnee_sommet_pkey 
   CONSTRAINT     y   ALTER TABLE ONLY public.randonnee_sommet
    ADD CONSTRAINT randonnee_sommet_pkey PRIMARY KEY (id_randonnee, id_sommet);
 P   ALTER TABLE ONLY public.randonnee_sommet DROP CONSTRAINT randonnee_sommet_pkey;
       public                 postgres    false    244    244            �           2606    16403    refuge refuge_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.refuge
    ADD CONSTRAINT refuge_pkey PRIMARY KEY (id_refuge);
 <   ALTER TABLE ONLY public.refuge DROP CONSTRAINT refuge_pkey;
       public                 postgres    false    218            �           2606    16415    relier relier_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.relier
    ADD CONSTRAINT relier_pkey PRIMARY KEY (id_refuge, id_service);
 <   ALTER TABLE ONLY public.relier DROP CONSTRAINT relier_pkey;
       public                 postgres    false    221    221            �           2606    16509 .   relier_sommet_refuge relier_sommet_refuge_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.relier_sommet_refuge
    ADD CONSTRAINT relier_sommet_refuge_pkey PRIMARY KEY (id_sommet, id_refuge);
 X   ALTER TABLE ONLY public.relier_sommet_refuge DROP CONSTRAINT relier_sommet_refuge_pkey;
       public                 postgres    false    234    234                       2606    41550 (   reservation_guide reservation_guide_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.reservation_guide
    ADD CONSTRAINT reservation_guide_pkey PRIMARY KEY (id_reservation_guide);
 R   ALTER TABLE ONLY public.reservation_guide DROP CONSTRAINT reservation_guide_pkey;
       public                 postgres    false    250            �           2606    16441    reservation reservation_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_pkey PRIMARY KEY (id_reservation);
 F   ALTER TABLE ONLY public.reservation DROP CONSTRAINT reservation_pkey;
       public                 postgres    false    225                       2606    41532 *   reservation_refuge reservation_refuge_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public.reservation_refuge
    ADD CONSTRAINT reservation_refuge_pkey PRIMARY KEY (id_reservation);
 T   ALTER TABLE ONLY public.reservation_refuge DROP CONSTRAINT reservation_refuge_pkey;
       public                 postgres    false    248                       2606    41566 .   sauvegarde_randonnee sauvegarde_randonnee_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.sauvegarde_randonnee
    ADD CONSTRAINT sauvegarde_randonnee_pkey PRIMARY KEY (user_id, id_randonnee, type_sauvegarde);
 X   ALTER TABLE ONLY public.sauvegarde_randonnee DROP CONSTRAINT sauvegarde_randonnee_pkey;
       public                 postgres    false    251    251    251            �           2606    16410    service service_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_pkey PRIMARY KEY (id_service);
 >   ALTER TABLE ONLY public.service DROP CONSTRAINT service_pkey;
       public                 postgres    false    220            �           2606    16504    sommet sommet_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.sommet
    ADD CONSTRAINT sommet_pkey PRIMARY KEY (id_sommet);
 <   ALTER TABLE ONLY public.sommet DROP CONSTRAINT sommet_pkey;
       public                 postgres    false    233            �           2606    41432    utilisateur utilisateur_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_pkey PRIMARY KEY (id_user);
 F   ALTER TABLE ONLY public.utilisateur DROP CONSTRAINT utilisateur_pkey;
       public                 postgres    false    237            �           2606    41436 $   utilisateur utilisateur_username_key 
   CONSTRAINT     c   ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_username_key UNIQUE (username);
 N   ALTER TABLE ONLY public.utilisateur DROP CONSTRAINT utilisateur_username_key;
       public                 postgres    false    237            �           1259    49157 "   easyhike_idx_fournir_guide_profile    INDEX     k   CREATE INDEX easyhike_idx_fournir_guide_profile ON public.fournir USING btree (id_guide_profile_easyhike);
 6   DROP INDEX public.easyhike_idx_fournir_guide_profile;
       public                 postgres    false    231            �           1259    41602    easyhike_idx_guider_utilisateur    INDEX     ^   CREATE INDEX easyhike_idx_guider_utilisateur ON public.guider USING btree (user_id_easyhike);
 3   DROP INDEX public.easyhike_idx_guider_utilisateur;
       public                 postgres    false    235            �           1259    41603    easyhike_idx_randonnee_parc    INDEX     T   CREATE INDEX easyhike_idx_randonnee_parc ON public.randonnee USING btree (id_parc);
 /   DROP INDEX public.easyhike_idx_randonnee_parc;
       public                 postgres    false    243            �           1259    41604    easyhike_idx_rs_randonnee    INDEX     ^   CREATE INDEX easyhike_idx_rs_randonnee ON public.randonnee_sommet USING btree (id_randonnee);
 -   DROP INDEX public.easyhike_idx_rs_randonnee;
       public                 postgres    false    244            �           1259    41605    easyhike_idx_rs_sommet    INDEX     X   CREATE INDEX easyhike_idx_rs_sommet ON public.randonnee_sommet USING btree (id_sommet);
 *   DROP INDEX public.easyhike_idx_rs_sommet;
       public                 postgres    false    244            �           1259    32799    fki_id_client    INDEX     J   CREATE INDEX fki_id_client ON public.reservation USING btree (id_client);
 !   DROP INDEX public.fki_id_client;
       public                 postgres    false    225            �           1259    32805    fki_id_refuge    INDEX     J   CREATE INDEX fki_id_refuge ON public.reservation USING btree (id_refuge);
 !   DROP INDEX public.fki_id_refuge;
       public                 postgres    false    225            &           2606    41592 /   avis_randonnee avis_randonnee_id_randonnee_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.avis_randonnee
    ADD CONSTRAINT avis_randonnee_id_randonnee_fkey FOREIGN KEY (id_randonnee) REFERENCES public.randonnee(id_randonnee);
 Y   ALTER TABLE ONLY public.avis_randonnee DROP CONSTRAINT avis_randonnee_id_randonnee_fkey;
       public               postgres    false    243    253    4855            '           2606    41587 *   avis_randonnee avis_randonnee_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.avis_randonnee
    ADD CONSTRAINT avis_randonnee_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.utilisateur(id_user);
 T   ALTER TABLE ONLY public.avis_randonnee DROP CONSTRAINT avis_randonnee_user_id_fkey;
       public               postgres    false    253    4844    237                       2606    49152 )   fournir fk_easyhike_fournir_guide_profile    FK CONSTRAINT     �   ALTER TABLE ONLY public.fournir
    ADD CONSTRAINT fk_easyhike_fournir_guide_profile FOREIGN KEY (id_guide_profile_easyhike) REFERENCES public.guide_profile(id_guide);
 S   ALTER TABLE ONLY public.fournir DROP CONSTRAINT fk_easyhike_fournir_guide_profile;
       public               postgres    false    239    231    4848                       2606    41597 %   guider fk_easyhike_guider_utilisateur    FK CONSTRAINT     �   ALTER TABLE ONLY public.guider
    ADD CONSTRAINT fk_easyhike_guider_utilisateur FOREIGN KEY (user_id_easyhike) REFERENCES public.utilisateur(id_user);
 O   ALTER TABLE ONLY public.guider DROP CONSTRAINT fk_easyhike_guider_utilisateur;
       public               postgres    false    237    235    4844                       2606    32811    reservation fk_id_client    FK CONSTRAINT     �   ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT fk_id_client FOREIGN KEY (id_client) REFERENCES public.client(id_client);
 B   ALTER TABLE ONLY public.reservation DROP CONSTRAINT fk_id_client;
       public               postgres    false    225    4822    223                       2606    32838    reservation fk_id_guide    FK CONSTRAINT     }   ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT fk_id_guide FOREIGN KEY (id_guide) REFERENCES public.guide(id_guide);
 A   ALTER TABLE ONLY public.reservation DROP CONSTRAINT fk_id_guide;
       public               postgres    false    225    4832    230                       2606    32806    reservation fk_id_refuge    FK CONSTRAINT     �   ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT fk_id_refuge FOREIGN KEY (id_refuge) REFERENCES public.refuge(id_refuge);
 B   ALTER TABLE ONLY public.reservation DROP CONSTRAINT fk_id_refuge;
       public               postgres    false    4816    218    225                       2606    16488    fournir fournir_id_guide_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.fournir
    ADD CONSTRAINT fournir_id_guide_fkey FOREIGN KEY (id_guide) REFERENCES public.guide(id_guide);
 G   ALTER TABLE ONLY public.fournir DROP CONSTRAINT fournir_id_guide_fkey;
       public               postgres    false    231    230    4832                       2606    16493    fournir fournir_id_refuge_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.fournir
    ADD CONSTRAINT fournir_id_refuge_fkey FOREIGN KEY (id_refuge) REFERENCES public.refuge(id_refuge);
 H   ALTER TABLE ONLY public.fournir DROP CONSTRAINT fournir_id_refuge_fkey;
       public               postgres    false    218    231    4816                       2606    41446 (   guide_profile guide_profile_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.guide_profile
    ADD CONSTRAINT guide_profile_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.utilisateur(id_user) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.guide_profile DROP CONSTRAINT guide_profile_user_id_fkey;
       public               postgres    false    237    4844    239                       2606    32833    guider guider_id_client_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.guider
    ADD CONSTRAINT guider_id_client_fkey FOREIGN KEY (id_client) REFERENCES public.client(id_client);
 F   ALTER TABLE ONLY public.guider DROP CONSTRAINT guider_id_client_fkey;
       public               postgres    false    223    4822    235                       2606    32828    guider guider_id_guide_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.guider
    ADD CONSTRAINT guider_id_guide_fkey FOREIGN KEY (id_guide) REFERENCES public.guide(id_guide);
 E   ALTER TABLE ONLY public.guider DROP CONSTRAINT guider_id_guide_fkey;
       public               postgres    false    235    230    4832                       2606    16464 $   posseder posseder_id_equipement_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.posseder
    ADD CONSTRAINT posseder_id_equipement_fkey FOREIGN KEY (id_equipement) REFERENCES public.equipement(id_equipement);
 N   ALTER TABLE ONLY public.posseder DROP CONSTRAINT posseder_id_equipement_fkey;
       public               postgres    false    227    228    4828                       2606    16469     posseder posseder_id_refuge_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.posseder
    ADD CONSTRAINT posseder_id_refuge_fkey FOREIGN KEY (id_refuge) REFERENCES public.refuge(id_refuge);
 J   ALTER TABLE ONLY public.posseder DROP CONSTRAINT posseder_id_refuge_fkey;
       public               postgres    false    218    228    4816                       2606    41520 -   randonnee_guide randonnee_guide_id_guide_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.randonnee_guide
    ADD CONSTRAINT randonnee_guide_id_guide_fkey FOREIGN KEY (id_guide) REFERENCES public.guide_profile(id_guide) ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.randonnee_guide DROP CONSTRAINT randonnee_guide_id_guide_fkey;
       public               postgres    false    246    4848    239                       2606    41515 1   randonnee_guide randonnee_guide_id_randonnee_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.randonnee_guide
    ADD CONSTRAINT randonnee_guide_id_randonnee_fkey FOREIGN KEY (id_randonnee) REFERENCES public.randonnee(id_randonnee) ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.randonnee_guide DROP CONSTRAINT randonnee_guide_id_randonnee_fkey;
       public               postgres    false    4855    246    243                       2606    41475     randonnee randonnee_id_parc_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.randonnee
    ADD CONSTRAINT randonnee_id_parc_fkey FOREIGN KEY (id_parc) REFERENCES public.parc_national(id_parc);
 J   ALTER TABLE ONLY public.randonnee DROP CONSTRAINT randonnee_id_parc_fkey;
       public               postgres    false    4852    241    243                       2606    41500 3   randonnee_refuge randonnee_refuge_id_randonnee_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.randonnee_refuge
    ADD CONSTRAINT randonnee_refuge_id_randonnee_fkey FOREIGN KEY (id_randonnee) REFERENCES public.randonnee(id_randonnee) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.randonnee_refuge DROP CONSTRAINT randonnee_refuge_id_randonnee_fkey;
       public               postgres    false    243    245    4855                       2606    41505 0   randonnee_refuge randonnee_refuge_id_refuge_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.randonnee_refuge
    ADD CONSTRAINT randonnee_refuge_id_refuge_fkey FOREIGN KEY (id_refuge) REFERENCES public.refuge(id_refuge) ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.randonnee_refuge DROP CONSTRAINT randonnee_refuge_id_refuge_fkey;
       public               postgres    false    245    218    4816                       2606    41485 3   randonnee_sommet randonnee_sommet_id_randonnee_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.randonnee_sommet
    ADD CONSTRAINT randonnee_sommet_id_randonnee_fkey FOREIGN KEY (id_randonnee) REFERENCES public.randonnee(id_randonnee) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.randonnee_sommet DROP CONSTRAINT randonnee_sommet_id_randonnee_fkey;
       public               postgres    false    243    244    4855                       2606    41490 0   randonnee_sommet randonnee_sommet_id_sommet_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.randonnee_sommet
    ADD CONSTRAINT randonnee_sommet_id_sommet_fkey FOREIGN KEY (id_sommet) REFERENCES public.sommet(id_sommet) ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.randonnee_sommet DROP CONSTRAINT randonnee_sommet_id_sommet_fkey;
       public               postgres    false    233    4837    244                       2606    41451 !   refuge refuge_responsable_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.refuge
    ADD CONSTRAINT refuge_responsable_id_fkey FOREIGN KEY (responsable_id) REFERENCES public.utilisateur(id_user) ON DELETE SET NULL;
 K   ALTER TABLE ONLY public.refuge DROP CONSTRAINT refuge_responsable_id_fkey;
       public               postgres    false    237    4844    218            	           2606    16416    relier relier_id_refuge_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.relier
    ADD CONSTRAINT relier_id_refuge_fkey FOREIGN KEY (id_refuge) REFERENCES public.refuge(id_refuge);
 F   ALTER TABLE ONLY public.relier DROP CONSTRAINT relier_id_refuge_fkey;
       public               postgres    false    218    221    4816            
           2606    16421    relier relier_id_service_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.relier
    ADD CONSTRAINT relier_id_service_fkey FOREIGN KEY (id_service) REFERENCES public.service(id_service);
 G   ALTER TABLE ONLY public.relier DROP CONSTRAINT relier_id_service_fkey;
       public               postgres    false    221    220    4818                       2606    16515 8   relier_sommet_refuge relier_sommet_refuge_id_refuge_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.relier_sommet_refuge
    ADD CONSTRAINT relier_sommet_refuge_id_refuge_fkey FOREIGN KEY (id_refuge) REFERENCES public.refuge(id_refuge);
 b   ALTER TABLE ONLY public.relier_sommet_refuge DROP CONSTRAINT relier_sommet_refuge_id_refuge_fkey;
       public               postgres    false    218    234    4816                       2606    16510 8   relier_sommet_refuge relier_sommet_refuge_id_sommet_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.relier_sommet_refuge
    ADD CONSTRAINT relier_sommet_refuge_id_sommet_fkey FOREIGN KEY (id_sommet) REFERENCES public.sommet(id_sommet);
 b   ALTER TABLE ONLY public.relier_sommet_refuge DROP CONSTRAINT relier_sommet_refuge_id_sommet_fkey;
       public               postgres    false    234    233    4837            "           2606    41556 1   reservation_guide reservation_guide_id_guide_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reservation_guide
    ADD CONSTRAINT reservation_guide_id_guide_fkey FOREIGN KEY (id_guide) REFERENCES public.guide_profile(id_guide);
 [   ALTER TABLE ONLY public.reservation_guide DROP CONSTRAINT reservation_guide_id_guide_fkey;
       public               postgres    false    4848    239    250            #           2606    41551 0   reservation_guide reservation_guide_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reservation_guide
    ADD CONSTRAINT reservation_guide_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.utilisateur(id_user);
 Z   ALTER TABLE ONLY public.reservation_guide DROP CONSTRAINT reservation_guide_user_id_fkey;
       public               postgres    false    237    4844    250                        2606    41538 4   reservation_refuge reservation_refuge_id_refuge_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reservation_refuge
    ADD CONSTRAINT reservation_refuge_id_refuge_fkey FOREIGN KEY (id_refuge) REFERENCES public.refuge(id_refuge);
 ^   ALTER TABLE ONLY public.reservation_refuge DROP CONSTRAINT reservation_refuge_id_refuge_fkey;
       public               postgres    false    218    4816    248            !           2606    41533 2   reservation_refuge reservation_refuge_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reservation_refuge
    ADD CONSTRAINT reservation_refuge_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.utilisateur(id_user);
 \   ALTER TABLE ONLY public.reservation_refuge DROP CONSTRAINT reservation_refuge_user_id_fkey;
       public               postgres    false    4844    237    248            $           2606    41572 ;   sauvegarde_randonnee sauvegarde_randonnee_id_randonnee_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.sauvegarde_randonnee
    ADD CONSTRAINT sauvegarde_randonnee_id_randonnee_fkey FOREIGN KEY (id_randonnee) REFERENCES public.randonnee(id_randonnee);
 e   ALTER TABLE ONLY public.sauvegarde_randonnee DROP CONSTRAINT sauvegarde_randonnee_id_randonnee_fkey;
       public               postgres    false    243    251    4855            %           2606    41567 6   sauvegarde_randonnee sauvegarde_randonnee_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.sauvegarde_randonnee
    ADD CONSTRAINT sauvegarde_randonnee_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.utilisateur(id_user);
 `   ALTER TABLE ONLY public.sauvegarde_randonnee DROP CONSTRAINT sauvegarde_randonnee_user_id_fkey;
       public               postgres    false    4844    237    251            �      x������ � �      �   1  x�]��n�0���S�(�zȏҒ�䧩���`LEH+��kL+�^��J���X���jP
xY�z8y�z==W(J'�+�q=�� v(y-e~k,湔�@���Nz8i�5����!�Ar���XX
=��wm(�{�1,o���K�ai�q2�(~ܽE�䰄<�7H�̣>��$.˻��̾B��!�bH��P�D�6N�z���c�N����a͎烈O�G(3@*u��ُ߫J��Ҟ��ΐ~�o�v���VL�|\B�����(���`���5C�pT�3��p,��.L��      �   J   x�3�t�/JI-�2�t.J�-��+�2����I-)�2�tJ,)�)��*%����^	Tm���Wd��qqq       �   �   x�-��� ��x�N�]n�9��!$��TЖ� S���le�f��hec)���Vn�G�� �Ch�k�+N��i'ض�嫗�k]�UG{x��c���Ŷu����#����JCܰ*<����+���Һ�P.ʺ(|? ~{�+S      �   �  x�M��n�@�ׇ��D� ,��&V�VJ�I������T�Y�O�{�dg�g��Uh�u�B�oq\�X�J��t��D�����;t���\U0S�H���4OˈWbj�Q1Q�@�D��}'Z����AD�<�*���P������uZB���䡍B^���q�4�s#�%3�L͔�}.���=�#r1�I�`�
��f�2-,�`П�h��Gô�.���U�5��O����0�	�%�(�':Y�}nQK��N�f�"���h�A�K�qu���0���O�D��M����li���3Y�)��ɘ�'|���#~��$���O�t��g�͓�l��
�f�ē�H<���������/�w��;Է�T���r"IN�j9���H���vN�:�˚8
����'+��,�6�y?�(�?���z�teL,���4Z�r��?%�q;�m.���]�$�_��@      �   �   x�M��� �L0W�����Ǎ�[��B��$MLE#�[1�.6��%M��"Y$�d�=3zs�\�C�~U!2IjdbJN�{OaI.	�S2ϭ�w
�3�s��ö���{+u�è�~k�[#hG�����#2�9l:�J�(,��.d�I6OV��"[G��/Z��e�l�B���H�s�0&~����}c�}
g[�s��? ��K�      �   .   x�34�44���24�4� 3�9��"FF0�1L�&����� ���      �   
  x��X�nܸ�=~
b��X3���X8Nv�n�	�t�J�$z(Q!)ۓ7��}����o0�{�|����.�x<�(���PQ�#7	����⊥�}�M����7��9��1�h��s���W�wnV�&*���ǬV�e�J$��i�C.+��RV�o��/�P���1��3Va-+ǒFa4�҃���/�۰��I��,6��:,+u�)]Y��7�T%�pN`�t��\��K��1����6�o��&r���)����|iy.������s�ɥp�8y#���2QƸ^/,˲W��X�*��p���IZo��~�p���Y�C�Mek�Z�]�B;D�aN��y4͂Q���l4JO��坒񩉃q?���LO/F�w�g�����Ż�[��I/�ۿ�-Uٻ�y��/]���4z��}��O� ���Iw�]�ߞ���p���<��P
�+6�{z	J_��������Xɶ&!�'5� hyn'a�;�����Wju�1��F{l����=L5j@��Mx^�R��� kN��^��}�)�$�&��X�#P �v4���9б������\R�Ҋԁ/ �񵮄R�q���Ч��LW�*,nL� 6�`ꕼ}��$S2YO�t2M��t:�A��U�D�,��Y|���u�7zNʥn�.�����M�vp��T��%t�*[@���fɎJO"Z3
9�/u ciYR��F�Ca��=��P�;��JO '9堒6��%_�j��h��nu_⯦Z#m*R�W�gYєr�W\�p�^[���Y%S�ɤ����\xB���ny���$�R�;����pi�L,u
̍%�2KE�Gl	������[mTZ�[�9���e'*7hj�yj�p8������|@�-n���S��l�B�.�4xk�c���hx��D�f�LE݀�4�
7<�#m��,K �"^�K�/�ț�2�Q��Q���vM��V�w<��CF&�J$�b7��Y-�,6wnY���Q�33��Øc���s�)@]�&Q$MB�t�&�myIҪ��%~<�3����+n� �*^e�7P;�0�ơ��(�	���,JF�av��8����OĠFt��v��3���D��{�d����K�^�\=�(>c8za�a��#F�l�`k�8���{��U+RH�A�0��_�1D�~s7_�Iq��!m6�a�1�9Wk+S���\!��m��7"��k�&��LS�v�W��HkDf@2ƞ�_���w���ˊ�2	J�J��Ț�7�������A��d0�Y2�*(Z<�5D�����q��A�oO���K��ʊ��J<�I����Ս�z?��A�a��?��<��በ��� BT)*��w�o��Ғ�m�`�����ZC���
��y�����́lC�q��){����F� M�����+0[���Kf7�Õm]�[��noڱ��q�9�ہt�G kZx�̞�`f����˗���!��w ��J�Nh�&B���ᶓy^��#�zE���\��/�Ιn8�y,@��tW�P}IC\�I*�7�T�5M��D&M齙���Ȣ�I�O��u�:(��T�$R��<�jd�.��N(���v��'�h|2h/]B��"��g9�ScJ���S'��5y�@����$�Oks:ܛ?e�a�h�>`�(	�[�B��-�*)$��'��J���/�b��c��f`����uB��������gK����l2��o��Ki`��R����Li�!��D�pGdYk�*lS����_����o�\�����oas,�?zF�A���)��]��~f���%�`mM�23��\'�F

D(�EPȼ8�`m@	.t��M��|���ɢy�<7��
��"` Os�g^�� Ԭ?sY^p��s2=b��ͽ�xi�٦n�s߱�g3���*���1��L!�Ȍ�;QE$MB���u5�R0ۘ۫�y�ih�q�t�z���U�o��JyU,MJ]@ǌ�Km� ���[���`]-���4޺��%�ץ���������<�$6���ۦB�|��3�>R���[o!�o�� G
k��|�^�����<�^X,W����%�>nO�$J�\=n.	����'ic���
�S�>�g9 a
�1q�v#����$"�&�;�OTҒ='�_��a�Z��Mx@�T��Qc���m��JL�vݶ^/�C촔�;͏��pt�m��O�x�v۝Q��i�����Tj��P&O_Y<�<����Dԝِ2b�Y/VX��Mh�F,��n�C���{ɡ�r�}�J�*���G���΀��,X��
�UWBIn��e'�^��M7��0��<��x7W�zߓ�b���{�o:f���I��ǌu����Id��lC��qq����� �@���+�k���<�����o��0�(x�G����2cFf(�>	u�ĸKƾ�U�"F������2�ڵ�\� 2z|\�~��]���'ʤM��S�U}�n�� }-��a�����t����"<���"tL'Ô��¾�5��~CJ��?�c8�����x2���I��4�W���������%|      �   S   x�%�� 1��P�*CB�^�k��1F���`�w�u t��%3�',��j�yѸ}!��a�c�lb����~���      �   �  x��Z�r�6�^3O����*����fqkږ=q�)˕Ej�\h݄E�l[z�Y�ܺ+k�ͼA׼�� ��?�3�Q��n�I���9����²�6K|d�����U4�������<����p�i�6��m��U�����8��)K��i��7��~�V��g�ڔ��ZY��Eʕ����:|��ݵⷖӈ��k�ҋ��;�o�
_
�k�D�����V��I#⵾ŭ���JTɇU�jU	U%���<�ɰ?8O��ˍn_�qɍNc���rK�_-��D׺,ɸ�]�sQ�+][ˣs�4���q�̦BY,���S��嗸���re��s���X�ls_-�&�g97����E�Dq�k%��AS��0G��p`�E�5+x�^����3�1��it�o��������b���c%�Y����OsC�����R(�������-��U)�4����ca K7~<p���?c�����s`p]��B�E&�r�lUԖ弮�mw��fd���	�57rs߆�Z��>f��d(VfK]W��(���B����V9�.��yQЦg'��o{��e-JqdB�L��J���x��S������}9�L;e�>�S�Kh|���>+[���cC�Ꮩ��v�A����"�S�l��F�>���.	w0��%�fL���A�q�T��r��Et[��Eߋ��*8����J4&?2����A��
�.LNf�~��E4 �Μ�mC��\���J%����٫�R�5/�P�ԁ�
|�kR<J	��%�Q-����ccXz���0��#�V��>CҠ�yUZ�7"+O��q�613L��Č�V��v|�ݔ���+`��8\:>z�"�|Qk�W��{�:d�p����\��Q�~��90�q69�w��C�>�-�>���6ّ��J^zyr��4Ƭ*��V om��1h�8�S��"�H|��F�g)Sn�yA<�}[Hk!)�w�]B�@�>}��`�� v��q�I�n��D�C�ii�?�R.���H�����,�-GV}`��&�f;xƈ(����>�Ώ�p���p3t\o�I����m���Y��jh��+��՚��
鯰p|�%&�S#2$�U�+�c��Dz��c�����^(ō'���� �jI�+Nv<e��3��V�%�e�;�r�x� �����kM�ы��b��\�؅�J�¦<�G`�,���V{��o��f�) ���!
��w�s��1P	������fތ��=���
=��%�rn@�y��T�ҽ';j�ǿ�U"v��@�@���H�K~��K��YO;+�z�c?���QwKE��׸��h8��q@^�
D:�����x�jnk�6��6��T;�r���l��l�e������A���5�#����(���e �����]j�B���7w�r����s�c��|V�>�/�>���P[�9��L����zi�f�����o�W�X��4���}��OP��s�.}J~�(h|�a Xڧ�����\�L�D�l �s-��k����$�.���/�yc�G�,�ݤ9�u=�a��rLɧܦ���Ixn�= 3D{�V!��[h�$�d��P@d �Q!,�I;�f�Rԏ�n���/��(2�d����x4`��khx�m�=�_l�Z%��KE�r��t�P�vM��l}h�(������������eo%*�tR�6i�d�;�D�\�i'v���"π�$`�j�k�Q�I��S�n��|C��5���	�'��'��`WT|絥̐�H�y�O��
���X�󍚽A>z2O����e>A�p&>�bE(*L�\��+�74�� 톭_��.��_�2X��v�/�7�=q!7��MZkȜJ�;�^׶h�Y�:'-�٭�N�q	��4S������j�Ku��_/mu2'g"�N��H|r�d&ݨ�at�}B�C��>)���I`��KM�C�s7S��#�X�:�:�*RW{�q�Tn�-���s$����i%����y}�M�j���UE�ss�7�[9b�t�z!s8�sXf�+P^�G��`d�;�~��x"=I����У�<$�q����cV���T�28�(z��mmpE�FS�բQC�] �Q��u�]�w��&�O�|"�G�˽ �.��.[����(�׭�-
���HQY���H4<MIV�1���e-e�S��+7�Q��� s�(��Ҝ:F~��T��d��**�Q�>l?�'�ԃ��@�r�m7�c�:~��G���zgo�<d:�i��[����a�i]�u�;M��tK�(ՠG����ډ4j2 ̀jK�}�{޽�*�?2G7�ܢ�`�9����"��Z�u���	���k������?I�ótx�U{�&��\��Mέ�u��t:�|�|��T+T�b: ��-��R�&oۏ��g<���������~ꂴ]״e�^�	���u�~!G�^s+���7��@F�y#K�s�-Ȍ�'�wkJ��B8��s<j����t�gb��g~�M�tt>\\���8��#>I. ���~�[�-N^�%�]�%��w8�&}��iM�e>�o�Tu	�y�G	���U� ZCަ����%Qv�̩�P�z���5��.�����(sַ6���;�YƩ ���"�Y�<T:(V�3��J�y!�)�E�DG�9п�V���^@JR!���I��]ݩ�}Fn�|��\���?=İ�)�9ԕ�{���UU���M�B�G���h!g���J|�g��y���b2_$��гj�'�ν����.�8���i"��%�%��8e�����_<�F��z�2�r]SC��b�s�>,�=ΐu�%�������d]�ã2ZQ�"�CS��@�Q�6�C��;Wl�&[���������S��g4֡�[���y��]�J.ܩ&0����u%,��$&�!%�οf�w�.��5P�K���rM>��i����X��G��p�~<F'G��}�j��;�txV$!��^�h�#W����)]���r�{�?�h0�����,2]�{�!VB���H��7�`W���;u�f4�._��W�g^;�G��Ov'�P��ʛ<����s�BPM�ikG�6�� ���w�[-�P�C�D)�����f��]H2wO̫JVu&>/�F	�!��x��#3�MÁ
WV�3$c���K�Y
����H��)B��P@�o��cZH֕#5��"�ݖ9�,���+�=����7B)t)��.�ʦ!5�~*p������>��h%ڴ�W�I:�H�my��k���9ޑ����4dPX]�n*�g|�B�ϵ�����/�w9K�T؊�:�����b�u��������g ���n���&�A�=���ʝL��-(������g3�����A.|T�����"=�G��<,f���B��߇�0t/���s(r:1]U8 �;����|�%H�G*w�М��r�C��viz�b;8�#���s�d��ʧ�왤w\$b]���xSOb���-���z�����bZ>��.@�s]��]��N:��GH��@!R�`�F�Sj��w߄	mϙ]w�8}0� �"n!��-<MB�xD��9չ��e`�ۓ�N�\�4woK�7��Lv��?vZ��}�fZK�@ܚ��U�ZK����b�����F�|#�Rt�����;�G�ǻ;r��o��R�X�K]Rk�A����Cf�8(���|�3�;M雹G}o'�� :�#<���J�4b�鐑�6���v��h��ծ)b�4P�PTm�Oi�*�ډ;�:�n	�I^{ڲmW�m�Nc������ʽ �ߞq[����i+*�i�w0jPݽP�SuNF+*^�k,"*�C�to{�|�	�Гj�������9�ӟ�M�6����������ˌ~xW���Q�#J�iى�S���ϵ]��d,�C�
F��+8=��x�ИaO��^b)˄��y��ܞ��afj�,�\�$���&Er߄�>��"�{F�i�F/���L���zH���ڧ�F!�ꥸ%�-L���L!M�I��87��D�������j���      �     x�]S�u1;�^6��/鿎��Q[#$l͚u[��?]Ś����$�o�	<.��c�;A���_��.c5M���� �':�	��,��sO���q�C�uLzO��f�D�`H�7M	� f#���E���Vi�v�Î�5i^�$�g,A
];.e;Q�AѠ�q�)}�vK߷=�[��'z��+�Ŗl��E�J�H��UFz�x$����ra�?���M@��NY8�^16�zŲ���mrKlQI����v8$\�
N���{�w����GD��`��      �   <   x����@�b����z��:Xk�Q��Z-G�g�� C���e�h�q?�n�� 9v	      �   [   x�-�K�0B�x�N�$1w���Qh��)�p�x��z`	��X�[�u)C؈��]�������~�@Z��P��q쉲\(��\f��w~      �   �  x�uV�r7<���8U
�ˇ$�F9N�Td�b���T��!&�,Y��CN��h�7X��|Iz�ꕋH��b���gϒ_x6����P�^��lO��*K&�d|v����/�i�����*x�kuɶ��
�[݄�^��Qs�o���%�F�UpʰW�3�^W֫<�w:���)~S�	^嫲�F6����+8U+��ɾQ��Z��I�&W)�,��!���ښ�\j{�˪q��j�Qlէp�[���k�G��&�q����y��;}�YN.iu}Ɏ�9h9��Φ�E����
�\��H6y>]�׎cه}C��ו���*���?A��{ʄ���cE#�3�5�;$c9X��@(�<�v�Z7��5R�r���+ӗ`p�ebI< �'�95�L�,�z\u�bz>�"��|�Hǋ�$���{ڒ�$2QK��+�X����nI�7��P�]�(������TV�+��J�_�Ҩ�̓r�g�3#!�ל5�C�E�x
;�@��C6��&R	�-5��=�,��LI�q��*�{�,�?r3i��P&�Y�^�)�Un���R���u���Jo
p����>G)DU�f)���Bk�t�)�Ve�Z�em(k�xנO#-+۠MXe���{��I+�rn�C:>��vM��^z���c~���g�i2�YZ QK��&��3}���݋��X[ �"�.���FN<�ϴ� 0-��yWfv�_G�m�K%�6[��� kdZ�Wi��c��t�x1���iPK(;>�L`q���t_�@M���,�Nf��L+E�B���;7����jw�C� �(D���C��^a�%J�w�w�y��\#57�Ҿ#ҋ���ЙM�]X[i�;�������v�b3�"%��mr$�}:��Y~=lI#I�&ǯ��.@�8iz:b
��F]UA�D�z���Z�Մ�7��6���c��ʇq���!C3��V:j����9��U���VZL��p�q�Yq/7'�)��ڒ���W����N������v~ Gw&Y��� �qŦ_?�u�� "�A��,C^=��g�NiQ[� ���?H�&�.q��6e|E.+СLbO�ح�0h��7�l��o:�o��@A�w<@,	�b��h�i���eo�a2���?�����Vl��OAױ�H���F>���#�T5l����F*�����A�Вpӗ����	��Q�$����Є�}�`�l���͘����b�{od�+C���F2g=r1�/��
���}{0u#��<i���y�o��c�����~H�fW�o1�����R�d�qV�36�dS�3�d.u�%��HE�t��gG	��&T�ngFn�L8�Rf�Uq[�Zǲ�F��>e��~<�!��SC�yrB�Mm��|畴ϑzȘ��,�=6��>&��u�@IܿY����*���;JR8%m#������?�r�      �   �   x���D!Ec)f��
����c.o'P]*����6�����d'�!_�<�ÿ�\ AI�{�{��z��I��I��9}�%�M�}�����~����{M�T��'��t�8i�j�������'(�%�OD���$<      �   N   x�%���0�7Sǉ�]��5�NB�&�;�'���F�pxpy�ѣD$%G8�#�&�^�Zֶ�UV�J�����      �   "  x���K��0 е{F��|��='`;H,f���s��&����IAba�<l\;�@����m�Rz
�ן����������1}��Ti}��F��%K9�\Z2K^B1o2`i���-kVsh"���F�ƺY�!�}��]�����WKZ��VV-9���GcE���y=o��=c��_�c�65�����S��T�Ҏ֕������?vg�f��6T�fڶ�����6�m��(_W�AeQY#6mK:��qG��'J���F���]��m�b��/n�����>���g�w       �      x������ � �      �      x������ � �      �      x������ � �      �   z   x�ͻ�0��^���4@D"�3֌��|G�Bn�m�Ki�����%b%mb�C�鋵4����b#第���4ŨJ��z��Ub/�b�'�2}^>�����q,��YLsu] �w�)�      �   e  x�U��n�0E��W��`�%Q)m�H-�nLb��a	�E��D����;�sg(d��n �B��W[�j0�x�9_����(��n��Υ��%�Ő�[Y�� �b1����z�� !m]̄*��/D��-+=N�8���H;��T�<Dh�ֶ�7�g��.(�����a0�}� k��R�ҏ4?����<I��)���M�Q�=␖͈iq�MZ4�I���� JN��,^6^���-�i�Z����Ы\FW[�o�~4�krӄg�A��)f��&��e�;`[ed��m��y	[�d�&����yt�;�8��ke�K�^�=.̪����	~�o�?/A�y»z      �   �  x����r�F�ϭ���g���!�vW��he[ޭؕ*�H����.�i�.y��|H���h�߿nzzz�3����fq�>�k�`�.�����t�ФQ��y����������ￂ�d����o×l�����S�bΓ��nJR�5@����)��ާEL�����)ARj@u`��q�S�I�
SbM���,���\k@��&�
�q1|.������M7%���.��s�.�,x�*AO7%�,6 {pN�/�o���U婛���)�
zOeC����v���	�ӇY��%[cQ�Mũc_�������,x�#V)�,�dm��MIRR.�G�%i����ŷ�nJ�T��mj�Ƃ�o���]���ƺ�M�M�cX�9������'�Jsáv#aRmBv��*��F�W��I�LA7%K�M�ؖ�>E*m�DO��tS��Z���kj�M��T������&L���-�r������!Hi^&#m�l��j����Jj���+��
��0��ղ�)ABi �ѷ��(�ca�/\�b�9ƅ&L:��(�2Lx��L��i��&l�=+�w	�ܓU�tSe��&p~��ȳ�γ�i��Bk�ux�j�ݦT�q�����mG�2o?�z�E7U�7��r.-�>9�^\F�|ډ6=�&-���wo,6~|�`��ף��J���?4Z����{�y�u���b���i��v��Q'�ěN�M0=
w4��(S��죀_v�V�{���G�)aT:=�p	�K/܇���a���_�w[Xo������O��6f4�5��
�W_ۂ��A�
��.9U�f��p�E3���Fo���k�3����Q�6u�����^��%�$[K��.����8�g�鏘b�P�Y�*��JwI�g���ⴵ��/��~Ǥ,�|*����E����+f]E7�//�ݍ����T.٩�ӟ1[����X��}��O�?l����S�õ;�c4�Y�N     