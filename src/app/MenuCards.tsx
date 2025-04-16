import React from "react";
import { Card } from "antd";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import styles from "./menuCards.module.css";

const MenuCards = () => {
  const { t } = useTranslation();

  const menus = [
    { title: t("test1"), desc: t("desc1"), link: "/layout-style" },
    { title: t("test2"), desc: t("desc2"), link: "/connect-api" },
    { title: t("test3"), desc: t("desc3"), link: "/form-table" },
  ];

  return (
    <div className={styles.menuContainer}>
      {menus.map((menu, idx) => (
        <Link href={menu.link} key={idx} className={styles.cardLink}>
          <Card
            title={menu.title}
            className={styles.menuCard}
            hoverable
            headStyle={{ 
              fontWeight: 500, 
              textAlign: 'center',
              borderBottom: '1px solid #f0f0f0'
            }}
            bodyStyle={{ 
              minHeight: 80, 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center" 
            }}
          >
            <span>{menu.desc}</span>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default MenuCards;
